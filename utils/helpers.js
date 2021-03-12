module.exports = {
    formatUptime: function (uptime) {
        let unit = 'segundo';
        if (uptime > 60) {
            uptime /= 60;
            unit = 'minuto';
        }
        if (uptime > 60) {
            uptime /= 60;
            unit = 'hora';
        }
        if (uptime !== 1) {
            unit += 's';
        }

        return parseInt(uptime) + ' ' + unit;
    },

    clearString: function (input) {
        let accents = 'ÀÁÂÃÄÅàáâãäåßÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž';
        let accentsOut = "AAAAAAaaaaaaBOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz";
        input = input.split('');
        input.forEach((letter, index) => {
            let i = accents.indexOf(letter);
            if (i !== -1) {
                input[index] = accentsOut[i];
            }
        })
        return input.join('').toLowerCase();
    },

    buildSorting: function (key, type = 'int', order = 'DESC') {
        return `__${type.toLowerCase()}__${key} ${order.toUpperCase()}`
    },

    buildResponseTasks: function (response, params = []) {
        let result = "";
        response.forEach(task => {
            result += `\n`;
            params.forEach(param => {
                if(task[param]) {
                    let value = task[param]
                        .toString()
                        .replace(/\r?\n|\r/g, "\n> ");

                    result += `> *${param.toString().toUpperCase()}:* ${value}\n`;
                }
            });
            result += `\n`;
        })

        return result;
    },
};
