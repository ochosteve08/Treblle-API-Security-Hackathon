// In src/v1/swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Basic Meta Informations about our API


const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Specify the version of OpenAPI Specification (OAS)
    info: {
      title: "TODO API Documentation",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
  },
  // Paths to the API endpoints (modify as per your project structure)
  apis: ["./src/routes/index.js"],
};

// Docs in JSON format


const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Function to setup our docs
const swaggerDocs = (app, port) => {
  // Route-Handler to visit our docs
  app.use("api/v1/docs/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make our docs in JSON format available
  app.get("api/v1/docs/.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
  );
   
};



module.exports = { swaggerDocs };
