// server/controllers/jellyfishController.js
const fs = require('fs');

const { getAllJellyfish,
  getAllJellyfishUnknown,
  inserirResposta,
  getRespostasPorJellyfishUnknown,
  getAllRespostas,
  inserirJellyfishConhecido,
  excluirJellyfishConhecidoPorId,
  getJellyfishUnknownPorId,
  exportarRespostasParaJSON,
} = require('../models/jellyfishModel');


function inserirJellyfishConhecidoController(req, res) {
  const { nome, descricao, nome_imagem } = req.body;

  const novoJellyfishConhecido = {
    nome,
    descricao,
    nome_imagem,
  };

  inserirJellyfishConhecido(novoJellyfishConhecido, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json({ message: 'Jellyfish conhecido inserido com sucesso!' });
    }
  });
}

// Função para excluir um "jellyfish" conhecido por ID
function excluirJellyfishConhecidoController(req, res) {
  const { id } = req.params;

  excluirJellyfishConhecidoPorId(id, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json({ message: 'Jellyfish conhecido excluído com sucesso!' });
    }
  });
}

// Function to retrieve a specific jellyfishUnknown by ID
function getJellyfishUnknownPorIdController(req, res) {
  const { id } = req.params;

  getJellyfishUnknownPorId(id, (error, result) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'JellyfishUnknown not found' });
      }
    }
  });
}

function getAllJellyfishController(req, res) {
  getAllJellyfish((error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
}

function getAllJellyfishUnknownController(req, res) {
  getAllJellyfishUnknown((error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
}

function inserirRespostaController(req, res) {
  console.log('Dados do corpo da requisição:', req.body);

  const { id_jellyfishunknown, resposta_utilizador } = req.body;

  inserirResposta(id_jellyfishunknown, resposta_utilizador, (error, results) => {
    if (error) {
      console.error('Erro ao inserir resposta:', error);
      res.status(500).send(error.message);
    } else {
      console.log('Resposta inserida com sucesso:', results);
      res.json({ message: 'Resposta inserida com sucesso!' });
    }
  });
}

function getRespostasPorJellyfishUnknownController(req, res) {
  const { idJellyfishUnknown } = req.params;

  getRespostasPorJellyfishUnknown(idJellyfishUnknown, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
}

// Função para obter todas as respostas
function getAllRespostasController(req, res) {
  getAllRespostas((error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json(results);
    }
  });
}


function exportarRespostasParaJSONController(req, res) {
  const nomeArquivo = 'respostas_exportadas.json';

  // Chamando a função do modelo para obter todas as respostas do banco de dados
  getAllRespostas((error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
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
    }
  });
}

module.exports = {
  getAllJellyfishController,
  getAllJellyfishUnknownController,
  inserirRespostaController,
  getRespostasPorJellyfishUnknownController,
  getAllRespostasController,
  inserirJellyfishConhecidoController,
  excluirJellyfishConhecidoController,
  getJellyfishUnknownPorIdController, 
  exportarRespostasParaJSONController,
};