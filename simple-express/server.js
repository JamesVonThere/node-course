const {request, response} = require('express');

const express = require('express');

const app = express();

const path = require('path');

const mysql = require('mysql2');
require('dotenv').config(); 

let pool = mysql
    .createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        connectionLimit: 10,
})
    .promise();

app.use('/', (request, response, next) => {
    console.log("a");
    next();
})
app.get('/', (request, response, next) => {
    console.log('df');
    next();
    // response.send('dfjhjk');
});
app.use('/', (request, response, next) => {
    console.log("b");
    // next();
    // response.send('dafdsfsfs');
})

app.get('/', (request, response, next) => {
    response.send('About Me');
});

app.get('/stocks/:stockID', async (req, res, next) => {

    console.log('get stocks by id' + id);

    let [data] = await pool.execute("SELECT * FROM stocks" + req.params.stockID);

    console.log('get stocks by id' + data);

    if (data.ength === 0) {
        res.status(404).json(data);
    }else{

        res.json(data);
    }

});

app.get('/error', (req, res, next) => {
    // throw new Error('error');
    // res.send('error');
})

app.use((req, res, next) => {
    console.log("end of the road ==> 404", req.path);
    res.status(404).send('Not Found');
});

app.listen(3001, () => {
    console.log('Server start at 3001');
});