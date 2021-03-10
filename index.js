require('dotenv').config();

if (!process.env.TOKEN) {
    console.log('Missing token in environment.');
    process.exit(1);
}
const { say } = require('./consumer/pkg/consumer.js');
console.log(say("Michael"));

require('./services/bot');



