const fs = require('fs');
const { connectToDatabase } = require('../database');
const path = require('path');


// Função para verificar imagens novas na pasta assets/jellyfishDesconhecidos
async function verificarImagensNovas() {
  try {
    const pool = await connectToDatabase();

    // Obter todas as imagens conhecidas no banco de dados
    const [results] = await pool.query('SELECT nome_imagem FROM jellyfishunknown');

    const imagensConhecidas = results.map((result) => result.nome_imagem);

    // Caminho para a pasta assets/jellyfishDesconhecidos
    const pastaAssets = path.join(__dirname, '../../assets', 'jellyfishDesconhecidos');

    // Ler o conteúdo da pasta assets/jellyfishDesconhecidos
    const arquivos = await fs.promises.readdir(pastaAssets);

    // Filtrar imagens novas
    const imagensNovas = arquivos.filter((arquivo) => !imagensConhecidas.includes(arquivo));

    if (imagensNovas.length > 0) {
      console.log('Imagens novas encontradas:', imagensNovas);

      // Adicionando um log para cada nova imagem encontrada
      imagensNovas.forEach((novaImagem) => {
        console.log(`Nova imagem encontrada: ${novaImagem}`);
      });

      return imagensNovas;
    } else {
      console.log('Nenhuma imagem nova encontrada.');
      return [];
    }
  } catch (error) {
    console.error('Erro ao verificar imagens novas:', error);
    throw error;
  }
}



// Função para inserir novas imagens na tabela jellyfishunknown
async function inserirImagensNovasNoBanco(imagensNovas) {
  try {
    const pool = await connectToDatabase();

    // Inserir novas imagens na tabela jellyfishunknown
    for (const nomeImagem of imagensNovas) {
      await pool.query('INSERT INTO jellyfishunknown (nome_imagem) VALUES (?)', [nomeImagem]);
      console.log(`Imagem inserida no banco de dados: ${nomeImagem}`);
    }

    console.log('Inserção no banco de dados concluída.');
  } catch (error) {
    console.error('Erro ao inserir imagens no banco de dados:', error);
    throw error;
  }
}

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


async function downloadAndSaveImage(url, localPath) {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
    });

    const imagePath = path.join(__dirname, localPath); // __dirname é o diretório atual do script

    response.data.pipe(fs.createWriteStream(imagePath));

    return new Promise((resolve, reject) => {
      response.data.on('end', () => resolve(imagePath));
      response.data.on('error', (err) => reject(err));
    });
  } catch (error) {
    console.error('Erro ao baixar a imagem:', error);
    throw error;
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
  verificarImagensNovas,
  inserirImagensNovasNoBanco
};
