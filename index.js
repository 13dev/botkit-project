const axios = require('axios');

require('dotenv').config();

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

if (!process.env.TOKEN) {
    console.log('Missing token in environment.');
    process.exit(1);
}

require('./services/bot');


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




