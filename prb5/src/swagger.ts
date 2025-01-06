import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express TypeScript CRUD API",
      version: "1.0.0",
      description:
        "A simple CRUD API application made with Express and TypeScript",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts"], // files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
