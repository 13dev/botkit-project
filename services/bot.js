const botkit = require('botkit');

const controller = botkit.slackbot({
    debug: true,
});

controller.spawn({
    token: process.env.token
}).startRTM();


module.exports = controller;
