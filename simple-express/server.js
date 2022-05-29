const { request, response } = require("express");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
app.use(cors());
const mysql = require("mysql2");
require("dotenv").config();

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

// app.use((request, response, next) => {
//     console.log("a");
//     next();
// })
// app.get('/', (request, response, next) => {
//     console.log('df');
//     // next();
//     response.send('dfjhjk');
// });
// app.use((request, response, next) => {
//     console.log("b");
//     next();
//     // response.send('dafdsfsfs');
// })

// app.get('/about', (request, response, next) => {
//     response.send('About Me');
// });

app.get("/stocks", async (req, res, next) => {
  let [data, fields] = await pool.execute("SELECT * FROM `stocks`");
  res.json(data);
});

app.get("/stocks/:stockID", async (req, res, next) => {
  // let id = req.params;

  // console.log('get stocks by id ' + id);

  let page = req.query.page || 1;
  console.log(page);

  let [allResult, fields_allResults] = await pool.execute(
    "SELECT * FROM `stock_prices` WHERE stock_id = ?",
    [req.params.stockID]
  );

  const total = allResult.length;

  const perPage = 5;
  const lastPage = Math.ceil(total / perPage);
  let offset = (page - 1) * perPage;

  let [data, fields] = await pool.execute(
    "SELECT * FROM `stock_prices` WHERE stock_id = ? limit ? offset ?",
    [req.params.stockID, perPage, offset]
  );

  res.json({
    pagination: {},
    data: data,
  });
});

app.get("/error", (req, res, next) => {
  // throw new Error('error');
  // res.send('error');
});

app.use((req, res, next) => {
  console.log("end of the road ==> 404", req.path);
  res.status(404).send("Not Found");
});

app.listen(3001, () => {
  console.log("Server start at 3001");
});
