const axios = require('axios');


module.exports = {
    requestFilterList: (data) => {
        axios.post('/RequestFilteredList', data)
            .then((response) => {
                console.log(response.data.d.Records)
            })
            .catch((error) => {
                console.log(response.data.d.Records)
            });
    },
}
