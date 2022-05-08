const mysql = require('mysql2');
require('dotenv').config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  con.query("CREATE DATABASE " + process.env.DB_NAME, function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });

  con.end();
});