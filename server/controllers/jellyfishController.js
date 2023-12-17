// server/controllers/jellyfishController.js

const { getAllJellyfish, 
  getAllJellyfishUnknown, 
  inserirResposta, 
  getRespostasPorJellyfishUnknown, 
  getAllRespostas, 
  inserirJellyfishConhecido, 
  excluirJellyfishConhecidoPorId, 
  getJellyfishUnknownPorId } = require('../models/jellyfishModel');




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

// function inserirRespostaController(req, res) {
//   const { idJellyfishUnknown, respostaUtilizador } = req.body;

//   inserirResposta(idJellyfishUnknown, respostaUtilizador, (error, results) => {
//     if (error) {
//       res.status(500).send(error.message);
//     } else {
//       res.json({ message: 'Resposta inserida com sucesso!' });
//     }
//   });
// }

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

module.exports = {
  getAllJellyfishController,
  getAllJellyfishUnknownController,
  inserirRespostaController,
  getRespostasPorJellyfishUnknownController,
  getAllRespostasController,
  inserirJellyfishConhecidoController,
  excluirJellyfishConhecidoController,
  getJellyfishUnknownPorIdController, // Adding the new controller
};