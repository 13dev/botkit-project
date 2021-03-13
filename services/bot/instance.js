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


const { Botkit } = require('botkit');
const { SlackAdapter } = require('botbuilder-adapter-slack');

let adapter = new SlackAdapter({
    botToken: process.env.TOKEN,
});

let controller = new Botkit({
    adapter: adapter,
});


module.exports = controller;
