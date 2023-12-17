// server/routes.js

const {
  inserirJellyfishConhecidoController,
  getAllJellyfishController,
  getAllJellyfishUnknownController,
  getJellyfishUnknownPorIdController,
  inserirRespostaController,
  getRespostasPorJellyfishUnknownController,
  getAllRespostasController,
  excluirJellyfishConhecidoController, // Adicionando o novo controlador
} = require('./controllers/jellyfishController');

function setupRoutes(app) {

/**
 * @swagger
 * /jellyfish:
 *   post:
 *     summary: Insere um novo Jellyfish conhecido na tabela Jellyfish
 *     tags: [Jellyfish]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               nome_imagem:
 *                 type: string
 *             required:
 *               - nome
 *               - descricao
 *               - nome_imagem
 *             example:
 *               nome: "Nome do Jellyfish"
 *               descricao: "Descrição do Jellyfish"
 *               nome_imagem: "nome_imagem.jpg"
 *     responses:
 *       200:
 *         description: Sucesso. Retorna uma mensagem indicando que o Jellyfish foi inserido com sucesso.
 */

 /**
   * @swagger
   * /jellyfish/{id}:
   *   delete:
   *     summary: Exclui um Jellyfish conhecido por ID
   *     tags: [Jellyfish]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: integer
   *         required: true
   *         description: O ID do Jellyfish conhecido a ser excluído
   *     responses:
   *       200:
   *         description: Sucesso. Retorna uma mensagem indicando que o Jellyfish foi excluído com sucesso.
   */


/**
 * @swagger
 * /jellyfishUnknown/{id}:
 *   get:
 *     summary: Retorna um JellyfishUnknown por ID
 *     tags: [Jellyfish]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do JellyfishUnknown a ser retornado
 *     responses:
 *       200:
 *         description: Sucesso. Retorna os detalhes do JellyfishUnknown.
 *       404:
 *         description: JellyfishUnknown não encontrado.
 */


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
   *     summary: Retorna todos os registos da tabela Jellyfish
   *     tags: [Jellyfish]
   *     responses:
   *       200:
   *         description: Sucesso. Retorna a lista de registos Jellyfish
   */

  /**
   * @swagger
   * /jellyfishUnknown:
   *   get:
   *     summary: Retorna todos os registos da tabela JellyfishUnknown
   *     tags: [Jellyfish]
   *     responses:
   *       200:
   *         description: Sucesso. Retorna a lista de registos JellyfishUnknown
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

  /**
 * @swagger
 * /respostas:
 *   get:
 *     summary: Retorna todas as respostas na tabela de respostas
 *     tags: [Jellyfish]
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de todas as respostas.
 */

  app.post('/jellyfish', inserirJellyfishConhecidoController);
  app.delete('/jellyfish/:id', excluirJellyfishConhecidoController); // Adicionando a rota para excluir um Jellyfish conhecido
  app.get('/jellyfish', getAllJellyfishController);
  app.get('/jellyfishUnknown', getAllJellyfishUnknownController);
  app.post('/respostas', inserirRespostaController);
  app.get('/respostas/:idJellyfishUnknown', getRespostasPorJellyfishUnknownController);
  app.get('/respostas', getAllRespostasController); // Adicionando a rota para obter todas as respostas
  app.get('/jellyfishUnknown/:id', getJellyfishUnknownPorIdController);


  app.get('*', (req, res) => {
    res.send('Bem-vindo ao meu aplicativo Express com MySQL e JellyfishDB!');
  });
}

module.exports = { setupRoutes };
