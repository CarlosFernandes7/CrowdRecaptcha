// server/routes.js
const fs = require('fs');
const path = require('path');


const {
  inserirJellyfishConhecidoController,
  getAllJellyfishController,
  getAllJellyfishUnknownController,
  getJellyfishUnknownPorIdController,
  inserirRespostaController,
  getRespostasPorJellyfishUnknownController,
  getAllRespostasController,
  excluirJellyfishConhecidoController,
  exportarRespostasParaJSONController,
   // Adicionando o novo controlador
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

  /**
 * @swagger
 * /export:
 *   get:
 *     summary: Exporta respostas para um arquivo JSON.
 *     description: Esta rota exporta todas as respostas para um arquivo JSON.
 *     responses:
 *       200:
 *         description: Conteúdo exportado com sucesso.
 *         content:
 *           application/json:
 *             example: { "message": "Conteúdo exportado com sucesso.", "file": "respostas_exportadas.json" }
 *       500:
 *         description: Erro durante a exportação.
 */

  /**
 * @swagger
 * /assets/JellyFishConhecidos/{nomeImagem}:
 *   get:
 *     summary: Retorna uma imagem de Jellyfish conhecido
 *     tags: [Jellyfish]
 *     parameters:
 *       - in: path
 *         name: nomeImagem
 *         schema:
 *           type: string
 *         required: true
 *         description: O nome da imagem de Jellyfish conhecido
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a imagem de Jellyfish conhecido.
 *         content:
 *           image/png:
 *             example: [raw image data]
 *       404:
 *         description: Imagem não encontrada.
 */

  /**
 * @swagger
 * /assets/JellyFishDesconhecidos/{nomeImagem}:
 *   get:
 *     summary: Retorna uma imagem de Jellyfish desconhecido
 *     tags: [Jellyfish]
 *     parameters:
 *       - in: path
 *         name: nomeImagem
 *         schema:
 *           type: string
 *         required: true
 *         description: O nome da imagem de Jellyfish desconhecido
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a imagem de Jellyfish desconhecido.
 *         content:
 *           image/png:
 *             example: [raw image data]
 *       404:
 *         description: Imagem não encontrada.
 */

  app.post('/jellyfish', inserirJellyfishConhecidoController);
  app.delete('/jellyfish/:id', excluirJellyfishConhecidoController); // Adicionando a rota para excluir um Jellyfish conhecido
  app.get('/jellyfish', getAllJellyfishController);
  app.get('/jellyfishUnknown', getAllJellyfishUnknownController);
  app.post('/respostas', inserirRespostaController);
  app.get('/respostas/:idJellyfishUnknown', getRespostasPorJellyfishUnknownController);
  app.get('/respostas', getAllRespostasController); // Adicionando a rota para obter todas as respostas
  app.get('/jellyfishUnknown/:id', getJellyfishUnknownPorIdController);
  app.get('/export', exportarRespostasParaJSONController);

  app.get('/assets/JellyFishConhecidos/:nomeImagem', (req, res) => {
    const nomeImagem = req.params.nomeImagem;
    const imagePath = path.join(__dirname, '../assets', 'JellyFishConhecidos', nomeImagem);
  
    console.log('Imagem de Jelly Conhecido: ');
    console.log('Caminho da imagem:', imagePath);
  
    // Verifique se o arquivo existe
    if (fs.existsSync(imagePath)) {
      // Configurar o cabeçalho Content-Type
      res.setHeader('Content-Type', 'image/png');  // ou 'image/png' dependendo do tipo da imagem
  
      // Enviar os dados brutos da imagem
      const imageStream = fs.createReadStream(imagePath);
      imageStream.pipe(res);
    } else {
      res.status(404).send('Imagem não encontrada');
    }
  });

  app.get('/assets/JellyFishDesconhecidos/:nomeImagem', (req, res) => {
    const nomeImagem = req.params.nomeImagem;
    const imagePath = path.join(__dirname, '../assets', 'JellyFishDesconhecidos', nomeImagem);
  
    console.log('Imagem de Jelly desconhecido: ');
    console.log('Caminho da imagem:', imagePath);
  
    // Verifique se o arquivo existe
    if (fs.existsSync(imagePath)) {
      // Configurar o cabeçalho Content-Type
      res.setHeader('Content-Type', 'image/png');  // ou 'image/png' dependendo do tipo da imagem
  
      // Enviar os dados brutos da imagem
      const imageStream = fs.createReadStream(imagePath);
      imageStream.pipe(res);
    } else {
      res.status(404).send('Imagem não encontrada');
    }
  });

  app.get('*', (req, res) => {
    res.send('Bem-vindo ao meu aplicativo Express com MySQL e JellyfishDB!');
  });
}

module.exports = { setupRoutes };
