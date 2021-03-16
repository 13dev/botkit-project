const helpers = require("../utils/helpers");
const keywords = require("../utils/keywords");
const scopes = require("../utils/scopes");
const axios = require('axios');

let makeTaskRequest = async (params = {}) => {
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

module.exports = function (controller) {

    // controller.hears('sample','message,direct_message', async(bot, message) => {
    //     await bot.reply(message, 'I heard a sample message.');
    // });
    //
    // controller.on('message,direct_message', async(bot, message) => {
    //     await bot.reply(message, `Echo: ${ message.text }`);
    // });


    controller.hears(keywords.GET_TASKS_BY_TYPE, scopes, async (bot, message) => {

        console.log(message);
        let numberTasks = parseInt(message.matches[1]);
        let type = parseInt(message.matches[2]);


        await bot.reply(message, `Obtendo *${numberTasks}* tarefas do tipo *${type}*...`);


        await makeTaskRequest({jtPageSize: numberTasks, filter: `__int__tipo=${type}`}).then(response => {
            let data = response.data.d.Records;

            if (!data.length) {
                bot.reply(message, "Não há resultados!");
                return;
            }

            let messageTasks = helpers.buildResponseTasks(data, [
                'Id', 'Reference', 'Description', 'Status'
            ]);

            bot.reply(message, messageTasks);
        }).catch(console.log);

    })


    // get my top priority tasks
    controller.hears(keywords.GET_PRIORITY_TASKS, scopes, async (bot, message) => {

        await bot.reply(message, `Obtendo tarefas com prioridade...`);


        await makeTaskRequest({filter: `__int__prioridade=1`}).then(response => {
            let data = response.data.d.Records;

            if (!data.length) {
                bot.reply(message, "Não há resultados!");
                return;
            }

            let messageTasks = helpers.buildResponseTasks(data, [
                'Id', 'Reference', 'Description', 'Status'
            ]);

            bot.reply(message, messageTasks);
        }).catch(console.log);
    })

}
