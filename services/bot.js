const botkit = require('botkit');
const os = require('os');
const scopes = require('../utils/scopes');
const {formatUptime} = require('../utils/helpers');
const keywords = require('../utils/keywords');

const controller = botkit.slackbot({
    debug: true,
});

controller.spawn({
    token: process.env.TOKEN
}).startRTM();


controller.hears(keywords.GREETINGS, scopes, (bot, message) => {
    const options = {
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    };

    // react to sended message
    bot.api.reactions.add(options, err => {
        if (err) {
            bot.botkit.log('Cant add emoji reaction.', err);
        }
    });

    controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
            bot.reply(message, `Hello ${user.name}!`);
            return;
        }

        bot.reply(message, 'Hello.');
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
            bot.reply(message, `Got it. I will call you ${user.name} from now on.`);
        });
    });
});

controller.hears(keywords.WHATS_USER_NAME, scopes, function (bot, message) {

    controller.storage.users.get(message.user, (err, user) => {
        if (user && user.name) {
            bot.reply(message, `Your name is ${user.name}`);
            return;
        }

        bot.startConversation(message, (err, convo) => {
            if (err) {
                bot.botkit.log('Cant start a conversation.', err);
                return;
            }

            convo.say('I do not know your name yet!');
            convo.ask('What should I call you?', (response, convo) => {

                convo.ask(`You want me to call you ${response.text} ?`, [
                    {
                        pattern: 'yes',
                        callback: (response, convo) => {
                            // since no further messages are queued after this,
                            // the conversation will end naturally with status == 'completed'
                            convo.next();
                        }
                    },
                    {
                        pattern: 'no',
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
                    bot.reply(message, 'OK! I will update my dossier...');

                    controller.storage.users.get(message.user, (err, user) => {
                        if (!user) {
                            user = {
                                id: message.user,
                            };
                        }

                        user.name = convo.extractResponse('nickname');
                        controller.storage.users.save(user, () => {
                            bot.reply(message, `I will call you ${user.name} from now on.`);
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

        convo.ask('Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: (response, convo) => {
                    convo.say('Bye!');
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
                    convo.say('*Phew!*');
                    convo.next();
                }
            }
        ]);
    });
});


controller.hears(keywords.IDENTIFY_ME, scopes, (bot, message) => {
    const hostname = os.hostname();
    const uptime = formatUptime(process.uptime());

    bot.reply(message, `:robot_face: I am a bot named <@${bot.identity.name}>. I have been running for ${uptime} on ${hostname}.`);
});

module.exports = controller;
