const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TnP_PBL API',
      version: '1.0.0',
      description: 'API documentation for Insightly backend',
    },
    servers: [
      {
        url: 'https://insightly1.onrender.com/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'], // Scan all route files for Swagger comments
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;