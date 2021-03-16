const keywords = require("../utils/keywords");
const scopes = require("../utils/scopes");

module.exports = function (controller) {

    controller.hears(keywords.GREETINGS, scopes, async (bot, message) => {
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
    controller.hears(keywords.SHUTDOWN, scopes, async (bot, message) => {

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

    controller.hears(keywords.IDENTIFY_ME, scopes, async (bot, message) => {
        const hostname = os.hostname();
        const uptime = formatUptime(process.uptime());

        bot.reply(message, `:robot_face: Sou um bot chamado <@${bot.identity.name}>. Estou ativo por ${uptime} em ${hostname}.`);
    });
}
