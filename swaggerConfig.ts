import swaggerJsdoc from 'swagger-jsdoc';
 import swaggerUi from 'swagger-ui-express';

 const options = {
   definition: {
     openapi: "3.0.0",
     info: {
       title: "MyBrand Backend API",
       version: "1.0.0",
       description: "Documentation for MyBrand Backend API",
     },
     servers: [
      {
       url: "https://backend-mybrand-solange.onrender.com",
       description: "live deployed server"
        },
     ],
   },
   apis: ["./src/routes/*.ts"],
 };

const specs = swaggerJsdoc(options);

const swaggerSetup = (app: any) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default swaggerSetup;
 