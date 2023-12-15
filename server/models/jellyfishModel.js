const fs = require('fs');
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

// function insertJellyfishUnknown(data, callback) {
//   const sql = 'INSERT INTO jellyfishUnknown (nome_imagem, resposta_texto) VALUES (?, ?)';
//   const values = [data.nome_imagem, data.resposta_texto];

//   console.log('SQL Query:', sql);

//   connection.beginTransaction(function (err) {
//     if (err) {
//       console.error('Error starting transaction:', err);
//       return callback(err);
//     }

//     connection.query(sql, values, (error, results) => {
//       if (error) {
//         console.error('Error in insertJellyfishUnknown:', error);
//         return connection.rollback(() => callback(error));
//       }

//       console.log('Imagem adicionada com sucesso:', data.nome_imagem);
//       connection.commit((commitErr) => {
//         if (commitErr) {
//           console.error('Error committing transaction:', commitErr);
//           return connection.rollback(() => callback(commitErr));
//         }
//         callback(null, results);
//       });
//     });
//   });
// }

function carregarImagensParaBD(caminhoDaPasta, callback) {
  fs.readdir(caminhoDaPasta, (err, arquivos) => {
    if (err) {
      console.error('Erro ao ler o diretório:', err);
      return callback(err);
    }

    const imagens = arquivos.filter(arquivo => /\.(jpg|jpeg|png|gif)$/i.test(arquivo));

    // Consulta ao banco de dados para obter os nomes das imagens existentes
    connection.query('SELECT nome_imagem FROM jellyfishUnknown', (queryError, results) => {
      if (queryError) {
        console.error('Erro ao consultar o banco de dados:', queryError);
        return callback(queryError);
      }

      // Lista de nomes de imagens existentes no banco de dados
      const imagensNoBD = results.map(result => result.nome_imagem);

      // Filtra apenas as imagens que não estão no banco de dados
      const imagensNaoExistentes = imagens.filter(nomeImagem => !imagensNoBD.includes(nomeImagem));

      const dadosInsercao = imagensNaoExistentes.map(nomeImagem => ({
        nome_imagem: nomeImagem,
      }));

      if (dadosInsercao.length > 0) {
        inserirImagensNoBD(dadosInsercao, callback);
      } else {
        // console.log('Nenhuma imagem nova encontrada.');
        callback(null, []);
      }
    });
  });
}

function inserirImagensNoBD(dados, callback) {
  const sql = 'INSERT INTO jellyfishUnknown (nome_imagem) VALUES ?';
  const valores = dados.map(({ nome_imagem }) => [nome_imagem]);

  connection.query(sql, [valores], (error, results) => {
    if (error) {
      console.error('Erro ao inserir imagens no banco de dados:', error);
      return callback(error);
    }

    console.log('Imagens adicionadas com sucesso.');
    callback(null, results); const fs = require('fs');
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

    // function insertJellyfishUnknown(data, callback) {
    //   const sql = 'INSERT INTO jellyfishUnknown (nome_imagem, resposta_texto) VALUES (?, ?)';
    //   const values = [data.nome_imagem, data.resposta_texto];

    //   console.log('SQL Query:', sql);

    //   connection.beginTransaction(function (err) {
    //     if (err) {
    //       console.error('Error starting transaction:', err);
    //       return callback(err);
    //     }

    //     connection.query(sql, values, (error, results) => {
    //       if (error) {
    //         console.error('Error in insertJellyfishUnknown:', error);
    //         return connection.rollback(() => callback(error));
    //       }

    //       console.log('Imagem adicionada com sucesso:', data.nome_imagem);
    //       connection.commit((commitErr) => {
    //         if (commitErr) {
    //           console.error('Error committing transaction:', commitErr);
    //           return connection.rollback(() => callback(commitErr));
    //         }
    //         callback(null, results);
    //       });
    //     });
    //   });
    // }

    function carregarImagensParaBD(caminhoDaPasta, callback) {
      fs.readdir(caminhoDaPasta, (err, arquivos) => {
        if (err) {
          console.error('Erro ao ler o diretório:', err);
          return callback(err);
        }

        const imagens = arquivos.filter(arquivo => /\.(jpg|jpeg|png|gif)$/i.test(arquivo));

        // Consulta ao banco de dados para obter os nomes das imagens existentes
        connection.query('SELECT nome_imagem FROM jellyfishUnknown', (queryError, results) => {
          if (queryError) {
            console.error('Erro ao consultar o banco de dados:', queryError);
            return callback(queryError);
          }

          // Lista de nomes de imagens existentes no banco de dados
          const imagensNoBD = results.map(result => result.nome_imagem);

          // Filtra apenas as imagens que não estão no banco de dados
          const imagensNaoExistentes = imagens.filter(nomeImagem => !imagensNoBD.includes(nomeImagem));

          const dadosInsercao = imagensNaoExistentes.map(nomeImagem => ({
            nome_imagem: nomeImagem,
          }));

          if (dadosInsercao.length > 0) {
            inserirImagensNoBD(dadosInsercao, callback);
          } else {
            // console.log('Nenhuma imagem nova encontrada.');
            callback(null, []);
          }
        });
      });
    }

    function inserirImagensNoBD(dados, callback) {
      const sql = 'INSERT INTO jellyfishUnknown (nome_imagem) VALUES ?';
      const valores = dados.map(({ nome_imagem }) => [nome_imagem]);

      connection.query(sql, [valores], (error, results) => {
        if (error) {
          console.error('Erro ao inserir imagens no banco de dados:', error);
          return callback(error);
        }

        console.log('Imagens adicionadas com sucesso.');
        callback(null, results);
      });
    }

    function verificarNovasImagens() {
      const caminhoDaPasta = '../assets/JellyFishDesconhecidos';

      // Inicia a verificação periódica
      setInterval(() => {
        // console.log('Verificando novas imagens...');
        carregarImagensParaBD(caminhoDaPasta, (err, results) => {
          if (err) {
            console.error('Erro ao carregar imagens para o banco de dados:', err);
          } else if (results.length > 0) {
            console.log('Imagens carregadas com sucesso.');
          }
        });
      }, 5000); // Executa a verificação a cada 5 segundos
    }

    // Inicia o processo de verificação de novas imagens
    verificarNovasImagens();

    module.exports = { getAllJellyfish, getAllJellyfishUnknown };

  });
}

function verificarNovasImagens() {
  const caminhoDaPasta = '../assets/JellyFishDesconhecidos';

  // Inicia a verificação periódica
  setInterval(() => {
    // console.log('Verificando novas imagens...');
    carregarImagensParaBD(caminhoDaPasta, (err, results) => {
      if (err) {
        console.error('Erro ao carregar imagens para o banco de dados:', err);
      } else if (results.length > 0) {
        console.log('Imagens carregadas com sucesso.');
      }
    });
  }, 5000); // Executa a verificação a cada 5 segundos
}

// Inicia o processo de verificação de novas imagens
verificarNovasImagens();

// Função para inserir respostas na tabela respostas
function inserirResposta(idJellyfishUnknown, respostaUtilizador, callback) {
  const sql = 'INSERT INTO respostas (id_jellyfishunknown, resposta_utilizador) VALUES (?, ?)';
  const values = [idJellyfishUnknown, respostaUtilizador];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao inserir resposta no banco de dados:', error);
      return callback(error);
    }

    console.log('Resposta adicionada com sucesso.');
    callback(null, results);
  });
}

// Função para obter todas as respostas associadas a um jellyfishUnknown por id
function getRespostasPorJellyfishUnknown(idJellyfishUnknown, callback) {
  const sql = 'SELECT * FROM respostas WHERE id_jellyfishunknown = ?';
  const values = [idJellyfishUnknown];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao obter respostas do banco de dados:', error);
      return callback(error);
    }

    callback(null, results);
  });
}

// Função para obter todas as respostas
function getAllRespostas(callback) {
  const sql = 'SELECT * FROM respostas';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Erro ao obter respostas do banco de dados:', error);
      return callback(error);
    }

    callback(null, results);
  });
}

module.exports = { getAllJellyfish, getAllJellyfishUnknown, inserirResposta,  getRespostasPorJellyfishUnknown,  getAllRespostas, };
