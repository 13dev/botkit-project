const botkit = require('botkit');
const os = require('os');
const scopes = require('../utils/scopes');
const {formatUptime} = require('../utils/helpers');
const keywords = require('../utils/keywords');
const helpers = require('../utils/helpers');

const controller = botkit.slackbot({
    debug: true,
});

controller.spawn({
    token: process.env.TOKEN
}).startRTM();

controller.middleware.receive.use((bot, message, next) => {

    if(message.type === 'direct_message') {
        if(message.text !== undefined) {
            message.text = helpers.clearString(message.text);
        }
    }

    next();
});


controller.hears(keywords.GREETINGS, scopes, (bot, message) => {
    const options = {
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    };

    // react to sended message
    bot.api.reactions.add(options, err => {
        if (err) {
            bot.botkit.log('Impossivel adicionar uma reacção.', err);
        }
    });

    controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
            bot.reply(message, `Olá ${user.name}!`);
            return;
        }

        bot.reply(message, 'Olá.');
    });
});

controller.hears(keywords.SET_USER_NAME, scopes, function (bot, message) {
    const name = message.match[1];

    controller.storage.users.get(message.user, (err, user) => {
        if (!user) {
            user = {
                id: message.user
            };
        }

        user.name = name;

        controller.storage.users.save(user, () => {
            bot.reply(message, `Percebi. Vou chamá-lo de ${user.name} a partir de agora.`);
        });
    });
});

controller.hears(keywords.WHATS_USER_NAME, scopes, function (bot, message) {

    controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
            bot.reply(message, `O seu nome é ${user.name}`);
            return;
        }

        bot.startConversation(message, (err, convo) => {
            if (err) {
                bot.botkit.log('Impossivel começar uma conversa.', err);
                return;
            }

            convo.say('Ainda não sei o seu nome!');
            convo.ask('Qual o seu nome/apelido?', (response, convo) => {

                convo.ask(`Queres que te chame de ${response.text} ?`, [
                    {
                        pattern: 'sim',
                        callback: (response, convo) => {
                            // since no further messages are queued after this,
                            // the conversation will end naturally with status == 'completed'
                            convo.next();
                        }
                    },
                    {
                        pattern: 'não',
                        callback: (response, convo) => convo.stop(),
                    },
                    {
                        default: true,
                        callback: (response, convo) => {
                            convo.repeat();
                            convo.next();
                        }
                    }
                ]);

                convo.next();
                // store the results in a field called nickname
            }, {'key': 'nickname'});

            convo.on('end', (convo) => {
                if (convo.status === 'completed') {
                    bot.reply(message, 'OK! Vou atualizar o meu dossiê...');

                    controller.storage.users.get(message.user, (err, user) => {
                        if (!user) {
                            user = {
                                id: message.user,
                            };
                        }

                        user.name = convo.extractResponse('nickname');
                        controller.storage.users.save(user, () => {
                            bot.reply(message, `Vou chamá-lo de ${user.name} a partir de agora.`);
                        });
                    });

                    return;
                }
                // conversation ended
                bot.reply(message, 'bye!');

            });

        });

    });
});


controller.hears(keywords.SHUTDOWN, scopes, (bot, message) => {

    bot.startConversation(message, (err, convo) => {

        convo.ask('Tem certeza que quer que eu desligue?', [
            {
                pattern: bot.utterances.yes,
                callback: (response, convo) => {
                    convo.say('Adeus!');
                    convo.next();
                    setTimeout(() => {
                        process.exit();
                    }, 3000);
                }
            },
            {
                pattern: bot.utterances.no,
                default: true,
                callback: (response, convo) => {
                    convo.say('*hummm!*');
                    convo.next();
                }
            }
        ]);
    });
});


controller.hears(keywords.IDENTIFY_ME, scopes, (bot, message) => {
    const hostname = os.hostname();
    const uptime = formatUptime(process.uptime());

    bot.reply(message, `:robot_face: Sou um bot chamado <@${bot.identity.name}>. Estou ativo por ${uptime} em ${hostname}.`);
});

module.exports = controller;
