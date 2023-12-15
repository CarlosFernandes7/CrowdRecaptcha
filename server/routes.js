// server/routes.js

const {
  getAllJellyfishController,
  getAllJellyfishUnknownController,
  insertJellyfishUnknownController
} = require('./controllers/jellyfishController');

/**
 * @swagger
 * tags:
 *   name: Jellyfish
 *   description: Operações relacionadas a Jellyfish
 */

/**
 * @swagger
 * /jellyfish:
 *   get:
 *     summary: Retorna todos os registros da tabela Jellyfish
 *     tags: [Jellyfish]
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de registos Jellyfish
 */
/**
 * @swagger
 * /jellyfishUnknown:
 *   get:
 *     summary: Retorna todos os registros da tabela JellyfishUnknown
 *     tags: [Jellyfish]
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de registos JellyfishUnknown
 */
/**
 * @swagger
 * /jellyfishUnknown:
 *   post:
 *     summary: Insere um novo registro na tabela JellyfishUnknown
 *     tags: [Jellyfish]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Adicione aqui as propriedades esperadas no corpo da requisição
 *             example:
 *               // Exemplo de dados a serem enviados no corpo da requisição
 *     responses:
 *       200:
 *         description: Sucesso. Retorna os detalhes do novo registro inserido
 */
/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota padrão de boas-vindas
 *     tags: [Default]
 *     responses:
 *       200:
 *         description: Boas-vindas ao meu aplicativo Express com MySQL e JellyfishDB
 */

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
