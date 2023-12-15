// server/routes.js

const {
  getAllJellyfishController,
  getAllJellyfishUnknownController,
  insertJellyfishUnknownController
} = require('./controllers/jellyfishController');

function setupRoutes(app) {
  // Route to show all records from the Jellyfish table
  app.get('/jellyfish', getAllJellyfishController);

  // Route to show all records from the JellyfishUnknown table
  app.get('/jellyfishUnknown', getAllJellyfishUnknownController);


  app.post('/jellyfishUnknown', insertJellyfishUnknownController);



  app.get('*', (req, res) => {
    res.send('Bem-vindo ao meu aplicativo Express com MySQL e JellyfishDB!');
  });
}

module.exports = { setupRoutes };
