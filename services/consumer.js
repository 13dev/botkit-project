const axios = require('axios');


module.exports = {
    requestFilterList: (data) => {
        axios.post('/RequestFilteredList', data)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error.response.data)
            });
    },
}
