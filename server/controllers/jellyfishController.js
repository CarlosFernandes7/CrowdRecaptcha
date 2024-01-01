// server/controllers/jellyfishController.js
const fs = require('fs');
const { connectToDatabase } = require('../database');

async function inserirJellyfishConhecidoController(req, res) {
  try {
    const { nome, descricao, nome_imagem } = req.body;

    const novoJellyfishConhecido = {
      nome,
      descricao,
      nome_imagem,
    };

    const pool = await connectToDatabase();
    const [result] = await pool.query('INSERT INTO jellyfish SET ?', [novoJellyfishConhecido]);

    res.json({ message: 'Jellyfish conhecido inserido com sucesso!', insertedId: result.insertId });
  } catch (error) {
    console.error('Erro ao inserir jellyfish conhecido:', error);
    res.status(500).send(error.message);
  }
}

async function excluirJellyfishConhecidoController(req, res) {
  try {
    const { id } = req.params;

    const pool = await connectToDatabase();
    const [result] = await pool.query('DELETE FROM jellyfish WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.json({ message: 'Jellyfish conhecido excluído com sucesso!' });
    } else {
      res.status(404).json({ message: 'Jellyfish conhecido não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir jellyfish conhecido:', error);
    res.status(500).send(error.message);
  }
}

async function getJellyfishUnknownPorIdController(req, res) {
  try {
    const { id } = req.params;

    const pool = await connectToDatabase();
    const [result] = await pool.query('SELECT * FROM jellyfishUnknown WHERE id = ?', [id]);

    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'JellyfishUnknown not found' });
    }
  } catch (error) {
    console.error('Erro ao obter jellyfishUnknown por ID:', error);
    res.status(500).send(error.message);
  }
}

async function getAllJellyfishController(req, res) {
  try {
    const pool = await connectToDatabase();
    const [results] = await pool.query('SELECT * FROM jellyfish');

    res.json(results);
  } catch (error) {
    console.error('Erro ao obter todos os jellyfish conhecidos:', error);
    res.status(500).send(error.message);
  }
}

async function getAllJellyfishUnknownController(req, res) {
  try {
    const pool = await connectToDatabase();
    const [results] = await pool.query('SELECT * FROM jellyfishUnknown');

    res.json(results);
  } catch (error) {
    console.error('Erro ao obter todos os jellyfish unknown:', error);
    res.status(500).send(error.message);
  }
}

async function inserirRespostaController(req, res) {
  try {
    console.log('Dados do corpo da requisição:', req.body);

    const { id_jellyfishunknown, resposta_utilizador, id_utilizador } = req.body;

    const pool = await connectToDatabase();
    const [result] = await pool.query('INSERT INTO respostas (id_jellyfishunknown, resposta_utilizador, id_utilizador) VALUES (?, ?, ?)', [id_jellyfishunknown, resposta_utilizador, id_utilizador]);

    console.log('Resposta inserida com sucesso:', result);
    res.json({ message: 'Resposta inserida com sucesso!' });
  } catch (error) {
    console.error('Erro ao inserir resposta:', error);
    res.status(500).send(error.message);
  }
}

async function getRespostasPorJellyfishUnknownController(req, res) {
  try {
    const { idJellyfishUnknown } = req.params;

    const pool = await connectToDatabase();
    const [results] = await pool.query('SELECT * FROM respostas WHERE id_jellyfishunknown = ?', [idJellyfishUnknown]);

    res.json(results);
  } catch (error) {
    console.error('Erro ao obter respostas por JellyfishUnknown:', error);
    res.status(500).send(error.message);
  }
}

async function getAllRespostasController(req, res) {
  try {
    const pool = await connectToDatabase();
    const [results] = await pool.query('SELECT * FROM respostas');

    res.json(results);
  } catch (error) {
    console.error('Erro ao obter todas as respostas:', error);
    res.status(500).send(error.message);
  }
}

async function exportarRespostasParaJSONController(req, res) {
  try {
    const nomeArquivo = 'respostas_exportadas.json';

    // Chamando a função do modelo para obter todas as respostas do banco de dados
    const pool = await connectToDatabase();
    const [results] = await pool.query('SELECT * FROM respostas');

    const respostasJSON = JSON.stringify(results, null, 2);

    // Escrevendo o JSON para um arquivo
    fs.writeFile(nomeArquivo, respostasJSON, (writeError) => {
      if (writeError) {
        console.error('Erro ao escrever arquivo JSON:', writeError);
        res.status(500).send(writeError.message);
      } else {
        console.log(`Conteúdo exportado para ${nomeArquivo} com sucesso.`);
        res.json({ message: 'Conteúdo exportado com sucesso.', file: nomeArquivo });
      }
    });
  } catch (error) {
    console.error('Erro ao exportar respostas para JSON:', error);
    res.status(500).send(error.message);
  }
}


module.exports = {
  inserirJellyfishConhecidoController,
  excluirJellyfishConhecidoController,
  getJellyfishUnknownPorIdController,
  getAllJellyfishController,
  getAllJellyfishUnknownController,
  inserirRespostaController,
  getRespostasPorJellyfishUnknownController,
  getAllRespostasController,
  exportarRespostasParaJSONController,
};
