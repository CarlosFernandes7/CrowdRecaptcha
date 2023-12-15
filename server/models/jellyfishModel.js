// server/models/jellyfishModel.js

const { connection } = require('../database');

function getAllJellyfish(callback) {
  connection.query('SELECT * FROM jellyfish', (error, results) => {
    callback(error, results);
  });
}

function getAllJellyfishUnknown(callback) {
  connection.query('SELECT * FROM jellyfishUnknown', (error, results) => {
    callback(error, results);
  });
}

function insertJellyfishUnknown(data, callback) {
  const sql = 'INSERT INTO jellyfishUnknown (nome_imagem, resposta_texto) VALUES ("' + data.nome_imagem + '", "' + data.resposta_texto + '")';

  console.log('SQL Query:', sql);

  connection.beginTransaction(function (err) {
    if (err) {
      console.error('Error starting transaction:', err);
      return callback(err);
    }

    connection.query(sql, [data.nome_imagem, data.resposta_texto], (error, results) => {
      if (error) {
        console.error('Error in insertJellyfishUnknown:', error);
        return connection.rollback(() => callback(error));
      }

      console.log('Insert successful. Results:', results);
      connection.commit((commitErr) => {
        if (commitErr) {
          console.error('Error committing transaction:', commitErr);
          return connection.rollback(() => callback(commitErr));
        }
        callback(null, results);
      });
    });
  });
}


module.exports = { getAllJellyfish, getAllJellyfishUnknown, insertJellyfishUnknown };
