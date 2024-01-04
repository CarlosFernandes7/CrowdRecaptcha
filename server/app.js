// server/app.js
const { swaggerUi, specs } = require('./swagger');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Adicione esta linha para usar o módulo path
const app = express();
const PORT = process.env.PORT || 3000;


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Middleware for parsing JSON
app.use(bodyParser.json());

// Configuration for MySQL connection
const { connectToDatabase } = require('./database');
const { setupRoutes } = require('./routes');

// Use the CORS middleware
app.use(cors());

// Rota swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Servir arquivos estáticos (corrigido)
app.use('/assets/JellyFishConhecidos', express.static(path.join(__dirname, 'assets/JellyFishConhecidos')));
app.use('/assets/JellyFishDesconhecidos', express.static(path.join(__dirname, 'assets/JellyFishDesconhecidos')));

// Connect to MySQL
connectToDatabase();

// Configure routes
setupRoutes(app);



const { verificarImagensNovas, inserirImagensNovasNoBanco } = require('./models/jellyfishModel'); // Substitua pelo caminho real

// Defina o intervalo para verificar novas imagens a cada 1 segundo
const intervaloVerificacao = 5000; // 1000 milissegundos = 1 segundo

// Função para verificar imagens novas
const verificarImagensPeriodicamente = async () => {
  try {
    const imagensNovas = await verificarImagensNovas();

    // Faça algo com as imagens novas, se necessário

    if (imagensNovas.length > 0) {
      console.log('Realizando verificação novamente em 5 segundo...');
    } else {
      console.log('Nenhuma imagem nova encontrada. Realizando verificação novamente em 1 segundo...');
    }
  } catch (error) {
    console.error('Erro ao verificar imagens novas:', error);
  }
};

// Iniciar a verificação periódica
// setInterval(verificarImagensPeriodicamente, intervaloVerificacao);






// Função para verificar imagens novas e inserir na tabela jellyfishunknown se existirem
async function verificarEInserirImagensNovasNoBanco() {
  try {
    const imagensNovas = await verificarImagensNovas();

    if (imagensNovas.length > 0) {
      await inserirImagensNovasNoBanco(imagensNovas);
    } else {
      console.log('Nenhuma imagem nova para adicionar ao banco de dados.');
    }
  } catch (error) {
    console.error('Erro ao verificar e inserir imagens novas:', error);
  }
}

// Chamar a função verificarEInserirImagensNovasNoBanco a cada segundo
setInterval(verificarEInserirImagensNovasNoBanco, 5000);
// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});