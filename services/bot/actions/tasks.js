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

        bot.reply(message, `:gear: Obtendo *${numberTasks}* tarefas do tipo *${type}*...`);


        makeTaskRequest({ jtPageSize: numberTasks, filter: `__int__tipo=${type}` }).then(response => {
            let data = response.data.d.Records;

            if (!data.length) {
                bot.reply(message, ":mega: Não há resultados!");
                return;
            }

            let messageTasks = helpers.buildResponseTasks(data, [
                'Id', 'Reference', 'Description', 'Status'
            ]);

            bot.reply(message, messageTasks);
        }).catch(console.log);

    },

    GET_TASKS: (bot, message) => {
        let numberTasks = parseInt(message.match[1]);

        bot.reply(message, `:gear: Obtendo *${numberTasks}* tarefas...`);

        makeTaskRequest({ jtPageSize: numberTasks }).then(response => {
            let data = response.data.d.Records;

            if (!data.length) {
                bot.reply(message, ":mega: Não há resultados!");
                return;
            }

            let messageTasks = helpers.buildResponseTasks(data, [
                'Id', 'Reference', 'Description', 'Status'
            ]);

            bot.reply(message, messageTasks);
        }).catch(console.log);
    },

    // get my top priority tasks
    GET_PRIORITY_TASKS: (bot, message) => {

        bot.reply(message, `:gear: Obtendo tarefas com prioridade...`);


        makeTaskRequest({  filter: `__int__prioridade=1` }).then(response => {
            let data = response.data.d.Records;

            if (!data.length) {
                bot.reply(message, ":mega: Não há resultados!");
                return;
            }

            let messageTasks = helpers.buildResponseTasks(data, [
                'Id', 'Reference', 'Description', 'Status'
            ]);

            bot.reply(message, messageTasks);
        }).catch(console.log);
    }
}

