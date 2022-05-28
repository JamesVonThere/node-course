// read stock no from mysql database

// npm i mysql 2

const mysql = require("mysql2/promise");
// const dotenv = require('dotenv');
// dotenv.config();
require('dotenv').config();
(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  let [data, fields] = await connection.execute("SELECT * FROM stocks");
  console.log(data);
//   console.log(fields);
  // results [
  //     [],
  //     []
  // ]
  connection.end();
})(); 
