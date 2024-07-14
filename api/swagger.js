import dotenv from 'dotenv';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
dotenv.config();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Management API',
      version: '1.0.0',
      description: 'API documentation for the Task Management system',
    },
    servers: [
      {
        url: process.env.API_ENDPOINT
      },
      {
        url: 'http://localhost:3001',
      },
      
    ],
  },
  apis: ['./api/routes/*.js'], 
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
