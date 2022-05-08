const con = require('./connectDB');

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = "CREATE TABLE customers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, phone INT UNSIGNED, email VARCHAR(255), room SMALLINT UNSIGNED NOT NULL, booking_date DATE NOT NULL, checkin_date DATETIME, checkout_date DATETIME)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table customers created");
  });
  
  sql = "CREATE TABLE rooms (id SMALLINT UNSIGNED PRIMARY KEY, status ENUM('FREE','SERVED','MAINTENANCE') NOT NULL, type TINYINT NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table rooms created");
  });
  
  sql = "CREATE TABLE room_type (id TINYINT PRIMARY KEY, name ENUM('STANDARD','DELUXE','SUITE') NOT NULL, price_day INT UNSIGNED NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table room_type created");
  });

  sql = "CREATE TABLE feedbacks (name VARCHAR(255) NOT NULL, room SMALLINT UNSIGNED NOT NULL, feedback TEXT(1000) NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table feedbacks created");
  });

  sql = "CREATE TABLE staffs (user_name CHAR(20) NOT NULL, hash CHAR(64) NOT NULL, salt CHAR(16) NOT NULL)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table staffs created");
  });

  con.end();
});