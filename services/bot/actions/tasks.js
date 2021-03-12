const helpers = require('../../../utils/helpers');
const consumer = require('../../consumer');
const axios = require('axios');

module.exports = {

    //get my first 5 tasks of type 16
    GET_TASKS_BY_TYPE: (bot, message) => {
        let numberTasks = parseInt(message.match[1]);
        let type = parseInt(message.match[2])

        bot.reply(message, `Obtendo ${numberTasks} tarefas of type ${type}`);

        axios.post('/RequestFilteredList', {
            filter: "__int__tipo=24",
            code: "",
            jtStartIndex: 0,
            jtPageSize: numberTasks,
            jtSorting: helpers.buildSorting('ID', 'int'),
            token: process.env.API_TOKEN
        }).then(response => {
            let messageTasks = helpers.buildMessageTasks(response.data.d.Records, [
                'Id', 'Reference', 'Description', 'Status'
            ]);

            bot.reply(message, messageTasks);
        }).catch(console.log);
    },

    GET_TASKS: (bot, message) => {
        let numberTasks = parseInt(message.match[1]);

        console.log("Num of tasks:", numberTasks);

        bot.reply(message, `Obtendo ${numberTasks} tarefas...`);

        axios.post('/RequestFilteredList', {
            filter: "1=1",
            code: "",
            jtStartIndex: 0,
            jtPageSize: numberTasks,
            jtSorting: helpers.buildSorting('ID', 'int'),
            token: process.env.API_TOKEN
        }).then(response => {
            let messageTasks = helpers.buildMessageTasks(response.data.d.Records, [
                'Id', 'Reference', 'Description', 'Status'
            ]);

            bot.reply(message, messageTasks);
        }).catch(console.log);
    }
}

