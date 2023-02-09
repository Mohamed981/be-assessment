const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "URL Monitoring",
      version: "1.0.0",
    },
    
  },
  apis: ["../index.js"],
  
};

// const swaggerSpec = swaggerJSDoc(options);
module.exports = { options };
