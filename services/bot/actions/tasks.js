const helpers = require('../../../utils/helpers');
const consumer = require('../../consumer');
const axios = require('axios');

module.exports = {
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
            response = response.data.d.Records;

            let result = "```";
            response.forEach(function (value) {
                result += `ID: ${value.Id} \n`;
                result += `Reference: ${value.Reference} \n`;
                result += `Description: ${value.Description} \n`;
                result += `Scope: ${value.Scope} \n`;
                result += `Email: ${value.Email} \n`;
                result += `Report Date: ${value.ReportDate} - Finish Date: ${value.FinishDate} \n`;
                result += `-------------------------------------------- \n\n`;
            })

            bot.reply(message, result + "```");
        }).catch(console.log);
    }
};
