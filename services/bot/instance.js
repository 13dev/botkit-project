// const botkit = require('botkit');
// const controller = botkit.slackbot({
//     debug: true,
//     scopes: [
//         'direct_message',
//         'direct_mention',
//         'mention',
//     ],
// });
//
// controller.spawn({
//     token: process.env.TOKEN
// }).startRTM();


const {Botkit} = require('botkit');
const {SlackAdapter} = require('botbuilder-adapter-slack');

let adapter = new SlackAdapter({
    clientSigningSecret: process.env.SLACK_SIGINING_SECRET,
    botToken: process.env.SLACK_BOT_TOKEN,

});

let controller = new Botkit({
    adapter,
});

controller.on('message', async(bot, message) => {
    await bot.reply(message, 'I heard a message!');
});

module.exports = controller;
