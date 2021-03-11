const botkit = require('botkit');
const os = require('os');
const scopes = require('../../utils/scopes');
const {formatUptime} = require('../../utils/helpers');
const keywords = require('../../utils/keywords');
const helpers = require('../../utils/helpers');
const controllers = require('services/bot/actions');

const controller = botkit.slackbot({
    debug: true,
    scopes: [
        'direct_message',
        'direct_mention',
        'mention',
    ],
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


for (const [keyword, handler] of Object.entries(controllers)) {
   controller.hears(keywords[keyword], scopes, handler);
}


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
                        pattern: 'nao',
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

module.exports = controller;
