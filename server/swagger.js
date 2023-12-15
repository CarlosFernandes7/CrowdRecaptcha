const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    info: {
      title: 'jellyfishApi',
      version: '1.0.0',
    },
  },
  apis: ['routes.js'], 
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
