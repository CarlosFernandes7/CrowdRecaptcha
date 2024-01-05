// server/app.js
const { swaggerUi, specs } = require('./swagger');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path'); // Adicione esta linha para usar o módulo path
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const fs = require('fs');
const base64Img = require('base64-img');




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

 //Chamar a função verificarEInserirImagensNovasNoBanco a cada segundo
 setInterval(verificarEInserirImagensNovasNoBanco, 2000);
 // Iniciar o servidor
 app.listen(PORT, () => {
   console.log(`Servidor está ouvindo na porta ${PORT}`);
 });


// // Função para fazer solicitação à API e manipular os dados
// async function fetchDataFromAPI() {
//   try {
//     // Substitua 'URL_DO_ENDPOINT' pela URL real do endpoint da API
//     const apiUrl = 'http://localhost:3003/api/images/lowAccuracyImages';

//     // Fazendo uma solicitação GET à API
//     const response = await axios.get(apiUrl);

//     // Manipulando os dados recebidos. Aqui você pode fazer o que precisar com os dados.
//     const responseData = response.data;
//     console.log('Dados da API:', responseData);
//   } catch (error) {
//     console.error('Erro ao obter dados da API:', error);
//   }
// }

// // Chame a função para obter dados da API quando necessário
// fetchDataFromAPI();



// // Função para fazer solicitação à API, manipular os dados e salvar em um arquivo
// async function fetchDataFromAPIAndSaveToFile() {
//   try {
//     // Substitua 'URL_DO_ENDPOINT' pela URL real do endpoint da API
//     const apiUrl = 'http://localhost:3003/api/images/lowAccuracyImages';

//     // Fazendo uma solicitação GET à API
//     const response = await axios.get(apiUrl);

//     // Manipulando os dados recebidos
//     const responseData = response.data;
//     console.log('Dados da API:', responseData);

//     // Convertendo os dados para formato de string (pode ser ajustado conforme necessário)
//     const dataAsString = JSON.stringify(responseData, null, 2);

//     // Especificando o caminho e nome do arquivo para salvar os dados
//     const filePath = path.join(__dirname, 'dados_da_api.json');

//     // Escrevendo os dados no arquivo
//     fs.writeFileSync(filePath, dataAsString);

//     console.log('Dados salvos com sucesso em:', filePath);
//   } catch (error) {
//     console.error('Erro ao obter dados da API e salvar no arquivo:', error);
//   }
// }

// fetchDataFromAPIAndSaveToFile();


// Função para obter dados da API, salvar imagens localmente e armazenar informações relevantes
async function fetchAndSaveImagesLocally() {
  try {
    // Substitua 'URL_DO_ENDPOINT' pela URL real do endpoint que fornece os dados das imagens
    const apiUrl = 'http://localhost:3003/api/images/lowAccuracyImages';

    // Fazendo uma solicitação GET à API para obter dados das imagens
    const response = await axios.get(apiUrl);

    // Obtendo os dados das imagens da resposta da API
    const imageDataArray = response.data;

    // Pasta de destino para as imagens
    const outputFolder = path.join(__dirname, '../assets/JellyFishDesconhecidos');

    // Certifica-se de que a pasta de destino existe, se não, cria-a
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }

    // Itera sobre os dados
    imageDataArray.forEach(async (imageData) => {
      const { _id, filename, output } = imageData;

      // Verifica se a propriedade 'output' existe
      if (output && Array.isArray(output)) {
        try {
          // Converte o array de bytes para um Buffer
          const imageBuffer = Buffer.from(output);

          // Caminho para salvar a imagem
          const imagePath = path.join(outputFolder, `${filename}`);

          // Salva a imagem localmente
          fs.writeFileSync(imagePath, imageBuffer);

          console.log(`Imagem ${filename} salva com sucesso em ${imagePath}`);
        } catch (error) {
          console.error(`Erro ao salvar a imagem ${filename}:`, error);
        }
      } else {
        console.error(`Dados de imagem inválidos para ${filename}`);
      }
    });

    console.log('Todas as imagens foram salvas localmente.');
  } catch (error) {
    console.error('Erro ao obter dados das imagens da API e salvar localmente:', error);
  }
}

// Chama a função para obter dados da API, salvar imagens localmente e armazenar informações relevantes
fetchAndSaveImagesLocally();