import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import { initializeDataSource } from "./db";
import { routes } from "./routes";
import swaggerSpec from "./swagger";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

initializeDataSource()
  .then(() => {
    console.log("Datasource initialized successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize the datasource:", error);
    process.exit(1);
  });
