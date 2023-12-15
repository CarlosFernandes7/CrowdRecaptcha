// server/app.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());

// Configuration for MySQL connection
const { connectToDatabase } = require('./database');
const { setupRoutes } = require('./routes');

// Use the CORS middleware
app.use(cors());

// Connect to MySQL
connectToDatabase();

// Configure routes
setupRoutes(app);

// Start the server
app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});
