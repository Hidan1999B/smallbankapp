const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require("./db.js");
const Account = require("./models/account.js");
const https = require('https');
const path = require('path');
const fs = require('fs');
app.use(bodyParser.json());
const seaport = require('seaport');
const ports = seaport.connect('localhost', 9090);
const httpsServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'keys', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'keys', 'cert.pem')),
    secure: "false"
}, app);

//Import Routes
const accountRoute = require('./routes/accounts');
app.use('/accounts', accountRoute)
const clientRoute = require('./routes/clients');
app.use('/clients', clientRoute);
//Initial route
app.get('/', (req, res) => {
    res.send('Welcome to the banking app');
});

//Start listening
/*
db.getConnection().then(async (res) => {
     let accounts = await Account.find().exec();
    console.log(accounts);
    app.listen(8080, () => {
        console.log('Server listening on 8080');
    });
})
*/

httpsServer.listen(ports.register('server'), () => {
    db.getConnection().then(() => {
        console.log("sslServer running");
            console.log('Server listening on', httpsServer.address().port);

    });
      
});
