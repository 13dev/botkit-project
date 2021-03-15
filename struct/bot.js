const axios = require('axios');
const { Botkit } = require('botkit');
const { WebAdapter } = require('botbuilder-adapter-web');

// Load process.env values from .env file
require('dotenv').config();

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const adapter = new WebAdapter({

});

const controller = new Botkit({
    webhook_uri: '/api/messages',
    adapter,
});

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

    // load traditional developer-created local custom feature modules
    controller.loadModules(__dirname + '/features');

});





