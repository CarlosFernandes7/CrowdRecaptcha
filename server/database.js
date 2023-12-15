// server/database.js

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '55fu77xm',
  database: 'jellyfishdb',
});

function connectToDatabase() {
  connection.connect((err) => {
    if (err) {
      console.error('Erro de conexão com o MySQL:', err);
    } else {
      console.log('Conectado ao MySQL!');
    }
  });
}

module.exports = { connectToDatabase, connection };
