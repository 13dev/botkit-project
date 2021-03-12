const helpers = require('../../../utils/helpers');
const axios = require('axios');


let makeTaskRequest = (params = {})  => {
    return axios.post('/RequestFilteredList', {
        filter: "1=1",
        code: "",
        jtStartIndex: 0,
        jtPageSize: 10,
        jtSorting: helpers.buildSorting('ID', 'int'),
        token: process.env.API_TOKEN,
        ...params
    });
};

module.exports = {

    //get my first 5 tasks of type 16
    GET_TASKS_BY_TYPE: (bot, message) => {
        let numberTasks = parseInt(message.match[1]);
        let type = parseInt(message.match[2]);

        bot.reply(message, `Obtendo *${numberTasks}* tarefas do tipo *${type}*...`);


        makeTaskRequest({ jtPageSize: numberTasks, filter: `__int__tipo=${type}` }).then(response => {
            let messageTasks = helpers.buildResponseTasks(response.data.d.Records, [
                'Id', 'Reference', 'Description', 'Status'
            ]);

            bot.reply(message, messageTasks);
        }).catch(console.log);

    },

    GET_TASKS: (bot, message) => {
        let numberTasks = parseInt(message.match[1]);

        bot.reply(message, `Obtendo *${numberTasks}* tarefas...`);

        makeTaskRequest({ jtPageSize: numberTasks }).then(response => {
            let messageTasks = helpers.buildResponseTasks(response.data.d.Records, [
                'Id', 'Reference', 'Description', 'Status'
            ]);

            bot.reply(message, messageTasks);
        }).catch(console.log);
    }
}

