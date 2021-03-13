const scopes = require('../../utils/scopes');
const keywords = require('../../utils/keywords');
const helpers = require('../../utils/helpers');
const controllers = require('./actions');
const controller = require('./instance');
const async = require("async");

controller.middleware.receive.use((bot, message, next) => {
    if (message.text !== undefined && message.type === 'direct_message') {
        message.text = helpers.clearString(message.text);
    }
    next();
});

for (const [keyword, handler] of Object.entries(controllers)) {
    if(keywords[keyword] !== undefined) {
        controller.hears(keywords[keyword], scopes, handler);
    }
}

module.exports = controller;
