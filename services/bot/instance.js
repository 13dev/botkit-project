const botkit = require('botkit');
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

module.exports = controller;
