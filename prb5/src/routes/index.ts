import express from "express";
import { resourceRoute } from "./resource.route";

export const routes = express.Router();

routes.use("/resources", resourceRoute);
