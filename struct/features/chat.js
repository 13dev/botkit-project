const path = require('path');
const {clearString} = require("../utils/helpers");

module.exports = function (controller) {

    controller.middleware.receive.use((bot, message, next) => {
        if (message.text !== undefined && message.type === 'direct_message') {
            message.text = clearString(message.text);
        }
        next();
    });


    controller.publicFolder('/', path.join(__dirname, '..', 'public'));

    console.log('Chat http://localhost:' + (process.env.PORT || 3000));
}
