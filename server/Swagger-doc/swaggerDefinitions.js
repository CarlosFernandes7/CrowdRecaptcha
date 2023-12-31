const swaggerDefinitions = {
    openapi: '3.0.0',
    info: {
      title: 'Jellyfish API',
      version: '1.0.0',
      description: 'API documentation for the Jellyfish application',
    },
    tags: [
      { name: 'Jellyfish', description: 'Operations related to Jellyfish' },
      { name: 'User', description: 'Operations related to User' },
      { name: 'Default', description: 'Default operations' },
      { name: 'Dados', description: 'Data operations' },
    ],
    components: {
      schemas: {
        // Define your data schemas here
      },
    },
    paths: {
      // Define your paths and operations here
    },
  };
  
  module.exports = swaggerDefinitions;