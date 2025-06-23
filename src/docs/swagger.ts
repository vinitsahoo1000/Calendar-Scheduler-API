import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'Calendar Scheduler API',
        version: '1.0.0',
        description: 'API documentation for the Calendar Scheduler app',
        },
        servers: [
        {
            url: 'http://localhost:3000/api/v1',
        },
        ],
        tags: [  
        {
            name: 'Events',
            description: 'Event management endpoints',
        },
        {
            name: 'Calendars',
            description: 'Calendar management endpoints',
        },
        {
            name: 'Users',
            description: 'Authentication & user settings',
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
        security: [
        {
            bearerAuth: [],
        },
        ],
    },
    apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
