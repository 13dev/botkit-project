const axios = require('axios');
const {Botkit} = require('botkit');
const {WebAdapter} = require('botbuilder-adapter-web');

require('dotenv').config();

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

if (!process.env.API_TOKEN) {
    console.log('Missing token in environment.');
    process.exit(1);
}

let controller = new Botkit({
    adapter: new WebAdapter(),
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




