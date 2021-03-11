const axios = require('axios');


module.exports = {
    requestFilterList: (data) => {
        let result = [];
        axios.post('/RequestFilteredList', data)
            .then((response) => result = response.data.d.Records)
            .catch((error) => result = error);

        return result;
    },
}
