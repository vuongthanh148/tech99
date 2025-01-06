import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { ResourceEntity } from "../entities/resource.entity";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT
    ? parseInt(process.env.POSTGRES_PORT, 10)
    : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [ResourceEntity],
  synchronize: true,
  logging: true,
});

export const maxRetries = 5;

export const initializeDataSource = async (
  retries = maxRetries,
  delay = 5000
) => {
  while (retries) {
    try {
      await AppDataSource.initialize();
      console.log("Data source initialized successfully.");
      break;
    } catch (error) {
      retries -= 1;
      console.error(
        `Failed to connect to the database. Retries left: ${retries}`
      );
      if (!retries) {
        throw error;
      }
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};
