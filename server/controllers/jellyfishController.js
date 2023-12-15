// server/controllers/jellyfishController.js

const { getAllJellyfish, getAllJellyfishUnknown, insertJellyfishUnknown } = require('../models/jellyfishModel');


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

// Adicione esta função no jellyfishController.js
function insertJellyfishUnknownController(req, res) {
  const dataToInsert = req.body; // Supondo que os dados a serem inseridos estão no corpo da solicitação

  insertJellyfishUnknown(dataToInsert, (error, results) => {
    if (error) {
      res.status(500).send(error.message);
    } else {
      res.json({ message: 'Dados inseridos com sucesso na tabela JellyfishUnknown!' });
    }
  });
}

module.exports = { getAllJellyfishController, getAllJellyfishUnknownController, insertJellyfishUnknownController };