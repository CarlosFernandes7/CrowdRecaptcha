// server/controllers/jellyfishController.js

const { getAllJellyfish, getAllJellyfishUnknown, inserirResposta, getRespostasPorJellyfishUnknown, getAllRespostas } = require('../models/jellyfishModel');

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
};
