// read stock no from mysql database

// npm i mysql 2

const mysql = require("mysql2/promise");

(async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "",
    password: "",
    database: "stock",
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