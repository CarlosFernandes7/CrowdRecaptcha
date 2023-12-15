// server/routes.js

const {
  getAllJellyfishController,
  getAllJellyfishUnknownController,
  inserirRespostaController,
  getRespostasPorJellyfishUnknownController,
} = require('./controllers/jellyfishController');

function setupRoutes(app) {
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
   *         description: Sucesso. Retorna a lista de registros Jellyfish
   */

  /**
   * @swagger
   * /jellyfishUnknown:
   *   get:
   *     summary: Retorna todos os registros da tabela JellyfishUnknown
   *     tags: [Jellyfish]
   *     responses:
   *       200:
   *         description: Sucesso. Retorna a lista de registros JellyfishUnknown
   */
/**
 * @swagger
 * /respostas:
 *   post:
 *     summary: Insere uma nova resposta na tabela de respostas
 *     tags: [Jellyfish]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idJellyfishUnknown:
 *                 type: integer
 *               respostaUtilizador:
 *                 type: string
 *             required:
 *               - idJellyfishUnknown
 *               - respostaUtilizador
 *             example:
 *               idJellyfishUnknown: 1
 *               respostaUtilizador: "Minha resposta"
 *     responses:
 *       200:
 *         description: Sucesso. Retorna uma mensagem indicando que a resposta foi inserida com sucesso.
 */

  /**
   * @swagger
   * /respostas/{idJellyfishUnknown}:
   *   get:
   *     summary: Retorna todas as respostas associadas a um JellyfishUnknown específico
   *     tags: [Jellyfish]
   *     parameters:
   *       - in: path
   *         name: idJellyfishUnknown
   *         schema:
   *           type: integer
   *         required: true
   *         description: O ID do JellyfishUnknown
   *     responses:
   *       200:
   *         description: Sucesso. Retorna a lista de respostas associadas ao JellyfishUnknown.
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
  app.get('/jellyfish', getAllJellyfishController);
  app.get('/jellyfishUnknown', getAllJellyfishUnknownController);
  app.post('/respostas', inserirRespostaController);
  app.get('/respostas/:idJellyfishUnknown', getRespostasPorJellyfishUnknownController);
  app.get('*', (req, res) => {
    res.send('Bem-vindo ao meu aplicativo Express com MySQL e JellyfishDB!');
  });
}

module.exports = { setupRoutes };
