
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

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
        url: 'http://localhost:3001',
      },
      {
        url: 'https://task-management-nextjs.onrender.com',
      },
    ],
  },
  apis: ['./api/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };
