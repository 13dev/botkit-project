module.exports = {
    GET_TASKS: (bot, message) => {
        let numberTasks = parseInt(message.match[1]);

        console.log("Num of tasks:", numberTasks);

        bot.say(`Obtendo ${numberTasks} tarefas...`);
    }
};
