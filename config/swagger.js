import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',  // Ensure you specify the openapi version
    info: {
      title: 'UMC_MINI_PROJECT_API',
      version: '1.0.0',
      description: 'UMC_MINI_PROJECT_API, API 설명',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
    ],
  },
  apis: ['./srcs/routes/*.js', './config/swagger/*.yaml'],  // Path to the API docs
};

const specs = swaggerJSDoc(options);

export { specs };
