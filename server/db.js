const mysql = require("mysql2");

// Create a connection pool (recommended for better performance)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

function executeQuery(query) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(query, (err, results, fields) => {
        // Release the connection back to the pool
        connection.release();

        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });
}

function executeQueryWithParams(query, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(query, values, (err, results, fields) => {
        connection.release();
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  });
}

module.exports = { executeQuery, executeQueryWithParams };
