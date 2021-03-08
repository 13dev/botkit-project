module.exports = {
    formatUptime: function (uptime) {
        let unit = 'segundo';
        if (uptime > 60) {
            uptime = uptime / 60;
            unit = 'minuto';
        }
        if (uptime > 60) {
            uptime = uptime / 60;
            unit = 'hora';
        }
        if (uptime !== 1) {
            unit = unit + 's';
        }

        uptime = parseInt(uptime) + ' ' + unit;
        return uptime;
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
    }
};
