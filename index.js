require('dotenv').config();

if (!process.env.TOKEN) {
    console.log('Missing token in environment.');
    process.exit(1);
}

require('./services/bot');



