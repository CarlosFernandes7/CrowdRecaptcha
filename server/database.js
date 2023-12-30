// server/database.js

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '55fu77xm',
  database: 'jellyfishdb',
  connectionLimit: 10,
});

function connectToDatabase() {
  return pool.promise(); // Retorna uma versão promissificada do pool
}

module.exports = { connectToDatabase, pool };
