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

const { 
  register,
  login,
  incrementNumRespostasCorretas,
  incrementNumRespostasErradas,
  updatePagamento,
  deleteUserById,
  fetchAllUsersController,
} = require('./controllers/userController');

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
 *     tags: [Dados]
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

 /**
   * @swagger
   * /updateNumRespostasCorretas/{userId}:
   *   put:
   *     summary: Atualiza o número de respostas corretas de um utilizador
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: integer
   *         required: true
   *         description: O ID do utilizador
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               novoNumero:
   *                 type: integer
   *             required:
   *               - novoNumero
   *             example:
   *               novoNumero: 5
   *     responses:
   *       200:
   *         description: Sucesso. Retorna uma mensagem indicando que o número de respostas corretas foi atualizado.
   *       500:
   *         description: Erro durante a atualização.
   */

  /**
   * @swagger
   * /updateNumRespostasErradas/{userId}:
   *   put:
   *     summary: Atualiza o número de respostas erradas de um utilizador
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: integer
   *         required: true
   *         description: O ID do utilizador
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               novoNumero:
   *                 type: integer
   *             required:
   *               - novoNumero
   *             example:
   *               novoNumero: 8
   *     responses:
   *       200:
   *         description: Sucesso. Retorna uma mensagem indicando que o número de respostas erradas foi atualizado.
   *       500:
   *         description: Erro durante a atualização.
   */

  /**
   * @swagger
   * /updatePagamento/{userId}:
   *   put:
   *     summary: Atualiza o pagamento de um utilizador
   *     tags: [User]
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: integer
   *         required: true
   *         description: O ID do utilizador
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               novoPagamento:
   *                 type: integer
   *             required:
   *               - novoPagamento
   *             example:
   *               novoPagamento: 23
   *     responses:
   *       200:
   *         description: Sucesso. Retorna uma mensagem indicando que o pagamento foi atualizado.
   *       500:
   *         description: Erro durante a atualização do pagamento.
   */

  /**
 * @swagger
 * /register:
 *   post:
 *     summary: Regista um novo utilizador
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               nome:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *               - nome
 *             example:
 *               email: "usuario@dominio.com"
 *               password: "senha123"
 *               nome: "Nome do utilizador"
 *     responses:
 *       200:
 *         description: Sucesso. Retorna uma mensagem indicando que o utilizador foi registrado com sucesso.
 *       500:
 *         description: Erro durante o registro.
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realiza o login de um utilizador
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *             example:
 *               email: "usuario@dominio.com"
 *               password: "senha123"
 *     responses:
 *       200:
 *         description: Sucesso. Retorna os detalhes do utilizador logado.
 *       401:
 *         description: Falha na autenticação.
 *       500:
 *         description: Erro durante o login.
 */

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Exclui um utilizador por ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: O ID do utilizador a ser excluído
 *     responses:
 *       200:
 *         description: Sucesso. Retorna uma mensagem indicando que o utilizador foi excluído com sucesso.
 *       500:
 *         description: Erro ao excluir o utilizador.
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

  console.log('---------------------------------------------');
  console.log('Request de imagem de Jelly Conhecido: ');
  console.log('Path da imagem:', imagePath);
  console.log('---------------------------------------------');

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

  console.log('---------------------------------------------');
  console.log('Request de imagem de Jelly desconhecido: ');
  console.log('Path da imagem:', imagePath);
  console.log('---------------------------------------------');


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

app.get('/utilizador', fetchAllUsersController);


app.get('*', (req, res) => {
  res.send('Bem-vindo ao meu aplicativo Express com MySQL e JellyfishDB!');
});

app.delete('/users/:userId', deleteUserById);


// Rota para registro de utilizador
app.post('/register', register);

// Rota para login
app.post('/login', login);


// Rota para atualizar o número de respostas corretas
app.put('/updateNumRespostasCorretas/:userId', incrementNumRespostasCorretas);

// Rota para atualizar o número de respostas erradas
app.put('/updateNumRespostasErradas/:userId', incrementNumRespostasErradas);

app.put('/updatePagamento/:userId', async (req, res) => {
  const userId = req.params.userId;
  const novoPagamento = req.body.novoPagamento;

  try {
    await updatePagamento(userId, novoPagamento);
    res.status(200).json({ message: 'Pagamento atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar o pagamento' });
  }
});
}



module.exports = { setupRoutes };
