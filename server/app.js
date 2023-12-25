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

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});
