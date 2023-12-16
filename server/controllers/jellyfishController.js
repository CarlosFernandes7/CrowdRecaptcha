// server/controllers/jellyfishController.js

const { getAllJellyfish, getAllJellyfishUnknown, inserirResposta, getRespostasPorJellyfishUnknown, getAllRespostas, inserirJellyfishConhecido, excluirJellyfishConhecidoPorId } = require('../models/jellyfishModel');




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
  const { idJellyfishUnknown, respostaUtilizador } = req.body;

  inserirResposta(idJellyfishUnknown, respostaUtilizador, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
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


module.exports = {
  getAllJellyfishController,
  getAllJellyfishUnknownController,
  inserirRespostaController,
  getRespostasPorJellyfishUnknownController,
  getAllRespostasController,
  inserirJellyfishConhecidoController,
  excluirJellyfishConhecidoController, // Adicionando o novo controlador
};