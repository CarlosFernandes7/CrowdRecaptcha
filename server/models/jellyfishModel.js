const fs = require('fs');
const { connectToDatabase } = require('../database');

// Função para inserir um "jellyfish" conhecido no banco de dados
async function inserirJellyfishConhecido(data, callback) {
  try {
    const pool = await connectToDatabase();
    const [result] = await pool.query('INSERT INTO jellyfish (nome, descricao, nome_imagem) VALUES (?, ?, ?)', [data.nome, data.descricao, data.nome_imagem]);

    console.log('Jellyfish conhecido adicionado com sucesso:', data.nome);
    callback(null, result);
  } catch (error) {
    console.error('Erro ao inserir "jellyfish" conhecido no banco de dados:', error);
    callback(error);
  }
}

// Função para excluir um "jellyfish" conhecido por ID no banco de dados
async function excluirJellyfishConhecidoPorId(id, callback) {
  try {
    const pool = await connectToDatabase();
    const [result] = await pool.query('DELETE FROM jellyfish WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      console.log('Jellyfish conhecido excluído com sucesso, ID:', id);
      callback(null, result);
    } else {
      callback({ message: 'Jellyfish conhecido não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir "jellyfish" conhecido do banco de dados:', error);
    callback(error);
  }
}

// Função para obter um jellyfishUnknown por ID no banco de dados
async function getJellyfishUnknownPorId(id, callback) {
  try {
    const pool = await connectToDatabase();
    const [result] = await pool.query('SELECT * FROM jellyfishUnknown WHERE id = ?', [id]);

    if (result.length > 0) {
      callback(null, result[0]); // Assuming ID is unique, returning the first result
    } else {
      callback({ message: 'JellyfishUnknown not found' });
    }
  } catch (error) {
    console.error('Erro ao obter jellyfishUnknown do banco de dados por ID:', error);
    callback(error);
  }
}

// Função para obter todos os jellyfish conhecidos
async function getAllJellyfish(callback) {
  try {
    const pool = await connectToDatabase();
    const [results] = await pool.query('SELECT * FROM jellyfish');

    callback(null, results);
  } catch (error) {
    console.error('Erro ao obter todos os jellyfish conhecidos:', error);
    callback(error);
  }
}

// Função para obter todos os jellyfish unknown
async function getAllJellyfishUnknown(callback) {
  try {
    const pool = await connectToDatabase();
    const [results] = await pool.query('SELECT * FROM jellyfishUnknown');

    callback(null, results);
  } catch (error) {
    console.error('Erro ao obter todos os jellyfish unknown:', error);
    callback(error);
  }
}

// Função para carregar imagens para o banco de dados
async function carregarImagensParaBD(caminhoDaPasta, callback) {
  try {
    const pool = await connectToDatabase();

    // ... (restante do código)

    if (dadosInsercao.length > 0) {
      inserirImagensNoBD(dadosInsercao, callback);
    } else {
      callback(null, []);
    }
  } catch (error) {
    console.error('Erro ao carregar imagens para o banco de dados:', error);
    callback(error);
  }
}

// Função para inserir imagens no banco de dados
async function inserirImagensNoBD(dados, callback) {
  try {
    const pool = await connectToDatabase();
    const sql = 'INSERT INTO jellyfishUnknown (nome_imagem) VALUES ?';
    const valores = dados.map(({ nome_imagem }) => [nome_imagem]);

    const [result] = await pool.query(sql, [valores]);

    console.log('Imagens adicionadas com sucesso.');
    callback(null, result);
  } catch (error) {
    console.error('Erro ao inserir imagens no banco de dados:', error);
    callback(error);
  }
}

// Função para verificar novas imagens
function verificarNovasImagens() {
  try {
    const caminhoDaPasta = '../assets/JellyFishDesconhecidos';

    setInterval(async () => {
      console.log('Verificando novas imagens...');
      await carregarImagensParaBD(caminhoDaPasta, (err, results) => {
        if (err) {
          console.error('Erro ao carregar imagens para o banco de dados:', err);
        } else if (results.length > 0) {
          console.log('Imagens carregadas com sucesso.');
        }
      });
    }, 5000);
  } catch (error) {
    console.error('Erro ao verificar novas imagens:', error);
  }
}

// Inicia o processo de verificação de novas imagens
verificarNovasImagens();

// Função para inserir uma resposta no banco de dados
async function inserirResposta(id_jellyfishunknown, resposta_utilizador,id_utilizador, callback) {
  try {
    const pool = await connectToDatabase();
    const sql = 'INSERT INTO respostas (id_jellyfishunknown, resposta_utilizador, id_utilizador) VALUES (?, ?, ?)';
    const values = [id_jellyfishunknown, resposta_utilizador, id_utilizador];

    const [result] = await pool.query(sql, values);

    console.log('Resposta adicionada com sucesso:', result);
    callback(null, result);
  } catch (error) {
    console.error('Erro ao inserir resposta no banco de dados:', error);
    callback(error);
  }
}

// Função para obter respostas por JellyfishUnknown
async function getRespostasPorJellyfishUnknown(idJellyfishUnknown, callback) {
  try {
    const pool = await connectToDatabase();
    const sql = 'SELECT * FROM respostas WHERE id_jellyfishunknown = ?';
    const values = [idJellyfishUnknown];

    const [result] = await pool.query(sql, values);

    callback(null, result);
  } catch (error) {
    console.error('Erro ao obter respostas por JellyfishUnknown do banco de dados:', error);
    callback(error);
  }
}

// Função para obter todas as respostas
async function getAllRespostas(callback) {
  try {
    const pool = await connectToDatabase();
    const sql = 'SELECT * FROM respostas';

    const [result] = await pool.query(sql);

    callback(null, result);
  } catch (error) {
    console.error('Erro ao obter todas as respostas do banco de dados:', error);
    callback(error);
  }
}

// Função para exportar respostas para JSON
async function exportarRespostasParaJSON(callback) {
  try {
    const pool = await connectToDatabase();
    const sql = 'SELECT * FROM respostas';

    const [result] = await pool.query(sql);

    const respostasJSON = JSON.stringify(result, null, 2);

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
  } catch (error) {
    console.error('Erro ao exportar respostas para JSON:', error);
    callback(error);
  }
}

module.exports = {
  getAllJellyfish,
  getAllJellyfishUnknown,
  inserirResposta,
  getRespostasPorJellyfishUnknown,
  getAllRespostas,
  inserirJellyfishConhecido,
  excluirJellyfishConhecidoPorId,
  getJellyfishUnknownPorId,
  exportarRespostasParaJSON,
};
