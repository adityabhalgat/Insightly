const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TnP_PBL API',
      version: '1.0.0',
      description: 'API documentation for TnP_PBL backend',
    },
    servers: [
      {
        url: 'http://localhost:5001/api',
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