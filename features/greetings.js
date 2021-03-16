const keywords = require("../utils/keywords");
const scopes = require("../utils/scopes");

module.exports = function (controller) {

    controller.hears(keywords.GREETINGS, scopes, async (bot, message) => {

        await bot.reply(message, 'Olá.');
        //
        // await controller.storage.getItem(message.user, async (err, user) => {
        //     if (user && user.name) {
        //
        //         return;
        //     }
        //
        //
        // });
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

        bot.reply(message, `:robot_face: Sou um bot, Estou ativo por ${uptime} em ${hostname}.`);
    });
}
