const helpers = require('../../../utils/helpers');
const consumer = require('../../consumer');
const axios = require('axios');


let makeTaskRequest = (params = {})  => {

    let data = {
        ...{
            filter: "1=1",
            code: "",
            jtStartIndex: 0,
            jtPageSize: 10,
            jtSorting: helpers.buildSorting('ID', 'int'),
            token: process.env.API_TOKEN
        },
        ...params
    };

    return axios.post('/RequestFilteredList', data);
};

module.exports = {

    //get my first 5 tasks of type 16
    GET_TASKS_BY_TYPE: (bot, message) => {
        let numberTasks = parseInt(message.match[1]);
        let type = parseInt(message.match[2]);

        bot.reply(message, `Obtendo ${numberTasks} tarefas of type ${type}`);


        makeTaskRequest({ jtPageSize: numberTasks }).then(response => {
            let messageTasks = helpers.buildResponseTasks(response.data.d.Records, [
                'Id', 'Reference', 'Description', 'Status'
            ]);

            bot.reply(message, messageTasks);
        }).catch(console.log);

    },

    GET_TASKS: (bot, message) => {
        let numberTasks = parseInt(message.match[1]);

        console.log("Num of tasks:", numberTasks);

        bot.reply(message, `Obtendo ${numberTasks} tarefas...`);

        makeTaskRequest({ filter: "__int__tipo=24", jtPageSize: numberTasks }).then(response => {
            let messageTasks = helpers.buildResponseTasks(response.data.d.Records, [
                'Id', 'Reference', 'Description', 'Status'
            ]);

            bot.reply(message, messageTasks);
        }).catch(console.log);
    }
}

