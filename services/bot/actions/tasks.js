const helpers = require('../../../utils/helpers');
const consumer = require('../../consumer');

module.exports = {
    GET_TASKS: (bot, message) => {
        let numberTasks = parseInt(message.match[1]);

        console.log("Num of tasks:", numberTasks);

        let data = consumer.requestFilterList({
            filter: "1=1",
            code: "",
            jtStartIndex: 0,
            jtPageSize: numberTasks,
            jtSorting: helpers.buildSorting('ID', 'int'),
            token: process.env.API_TOKEN
        });

        bot.reply(message, `Obtendo ${numberTasks} tarefas...`);

        console.log(data);

        axios.post('/RequestFilteredList', data)
            .then(response => {
                response.data.d.Records.forEach(function (value) {
                    bot.reply(message, "``` " +
                        "ID: " + value.Id +
                        "Reference: " + value.Reference +
                        "Description: " + value.Description +
                        "```");
                })
            }).catch(console.log);

        bot.reply(message, `Obtendo ${numberTasks} tarefas...`);
    }
};
