require('dotenv').config();
const axios = require('axios');
const consumer = require('./services/consumer');

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

if (!process.env.TOKEN) {
    console.log('Missing token in environment.');
    process.exit(1);
}

consumer.requestFilterList({
    filter: 1,
    code: "",
    jtStartIndex: 0,
    jtPageSize: 10,
    jtSorting: "__int__ID DESC",
    token: process.env.API_TOKEN
});

//require('./services/bot');







//
// function doCall(method, params) {
//     $.ajax({
//         type: "POST",
//         contentType: "application/json; charset=utf-8",
//         url: "http://ws01.inmadeira.com/qualidade/v5/gst/Expedita.WS.GesTools.Processes/processes.asmx/" + method,
//         data: params,
//         dataType: "json",
//         error: function (jqXHR, textStatus, errorThrown) {
//             console.log(jqXHR.responseText);
//         },
//         success: function (data) {
//             console.log(data);
//         }
//     });
// }
//
// doCall('ResponseFilterListBody', params)




