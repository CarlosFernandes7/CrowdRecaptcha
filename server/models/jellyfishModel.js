const fs = require('fs');
const { connection } = require('../database');


// Função para inserir um "jellyfish" conhecido no banco de dados
function inserirJellyfishConhecido(data, callback) {
  const sql = 'INSERT INTO jellyfish (nome, descricao, nome_imagem) VALUES (?, ?, ?)';
  const values = [data.nome, data.descricao, data.nome_imagem];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao inserir "jellyfish" conhecido no banco de dados:', error);
      return callback(error);
    }

    console.log('Jellyfish conhecido adicionado com sucesso:', data.nome);
    callback(null, results);
  });
}

// Função para excluir um "jellyfish" conhecido por ID no banco de dados
function excluirJellyfishConhecidoPorId(id, callback) {
  const sql = 'DELETE FROM jellyfish WHERE id = ?';
  const values = [id];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao excluir "jellyfish" conhecido do banco de dados:', error);
      return callback(error);
    }

    console.log('Jellyfish conhecido excluído com sucesso, ID:', id);
    callback(null, results);
  });
}

// Function to retrieve a specific jellyfishUnknown by ID
function getJellyfishUnknownPorId(id, callback) {
  const sql = 'SELECT * FROM jellyfishUnknown WHERE id = ?';
  const values = [id];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao obter jellyfishUnknown do banco de dados por ID:', error);
      return callback(error);
    }

    callback(null, results[0]); // Assuming ID is unique, returning the first result
  });
}

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


function inserirResposta(id_jellyfishunknown, resposta_utilizador, callback) {

  const sql = 'INSERT INTO respostas (id_jellyfishunknown, resposta_utilizador) VALUES (?, ?)';
  const values = [id_jellyfishunknown, resposta_utilizador];

  connection.query(sql, values, (error, results) => {
    if (error) {
      console.error('Erro ao inserir resposta no banco de dados:', error);
      return callback(error);
    }

    console.log('Resposta adicionada com sucesso:', results);
    console.log('Dados recebidos:', id_jellyfishunknown, resposta_utilizador);
    // console.log('Dados recebidos no servidor:', req.body);

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

function exportarRespostasParaJSON(callback) {
  const sql = 'SELECT * FROM respostas';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Erro ao obter respostas do banco de dados:', error);
      return callback(error);
    }

    const respostasJSON = JSON.stringify(results, null, 2);

    // Escrever o JSON para um arquivo
    const nomeArquivo = 'respostas.json';

    fs.writeFile(nomeArquivo, respostasJSON, (writeError) => {
      if (writeError) {
        console.error('Erro ao escrever arquivo JSON:', writeError);
        return callback(writeError);
      }

      console.log(`Conteúdo exportado para ${nomeArquivo} com sucesso.`);
      callback(null, nomeArquivo);
    });
  });
}

module.exports = {
  getAllJellyfish,
  getAllJellyfishUnknown,
  inserirResposta,
  getRespostasPorJellyfishUnknown,
  getAllRespostas,
  inserirJellyfishConhecido,
  excluirJellyfishConhecidoPorId,
  getJellyfishUnknownPorId, // Add the new function here
  exportarRespostasParaJSON,
};