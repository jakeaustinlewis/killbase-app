'use strict';

let express = require('express');
let path = require('path');
let app = express();
let port = process.env.PORT || 8000;

let morgan = require('morgan'); //Morgan is used for logging request details.
let bodyParser = require('body-parser');

let assassins = require('./routes/assassins');
// let code_names = require('./routes/code_names');
// let clients = require('./routes/clients');
// let targets = require('./routes/targets');
// let contracts = require('./routes/contracts');
// let assassins_contracts = require('./routes/assassins_contracts');


app.disable('x-powered-by');  //Sets the Boolean setting name to false

app.use(morgan('short')); 
app.use(bodyParser.json()); //tells the system that you want json to be used ------- WHYYYYYYYYYYYYYYYYYYYYYYYYYYYY


app.use(express.static(path.join('public')));

app.use(assassins);
// app.use(code_names);
// app.use(clients);
// app.use(targets);
// app.use(contracts);
// app.use(assassins_contracts);

app.use((req, res) => {
    re.sendStatus(404);
});

app.use((err, req, res, next) => {
    if (err.status) {
        return res
        .status(err.status)
        .set('Content-Type', 'text/plain')
        .send(err.message);
    }

    console.error(err.stack);
    res.sendStatus(500);
});

app.listen(port, function() {
  console.log('Listening on port', port);
});

module.exports = app;