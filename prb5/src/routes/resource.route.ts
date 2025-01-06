import { Router } from "express";
import {
  createResource,
  deleteResource,
  getResource,
  getResources,
  updateResource,
} from "../controllers/resource.controller";

export const resourceRoute = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     NewResource:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the resource
 *         type:
 *           type: string
 *           description: The type of the resource
 *         description:
 *           type: string
 *           description: The description of the resource
 *       example:
 *         name: Sample Resource
 *         type: Sample Type
 *         description: This is a sample resource
 *     Resource:
 *       type: object
 *       required:
 *         - name
 *         - type
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the resource
 *         name:
 *           type: string
 *           description: The name of the resource
 *         type:
 *           type: string
 *           description: The type of the resource
 *         description:
 *           type: string
 *           description: The description of the resource
 *       example:
 *         id: 1
 *         name: Sample Resource
 *         type: Sample Type
 *         description: This is a sample resource
 */

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: The resources managing API
 */

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get the list of resources
 *     tags: [Resources]
 *     responses:
 *       200:
 *         description: The resource description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: The resource was not found
 */
resourceRoute.get("/", getResources);

/**
 * @swagger
 * /resources/{id}:
 *   get:
 *     summary: Get the resource by id
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The resource id
 *     responses:
 *       200:
 *         description: The resource description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: The resource was not found
 */
resourceRoute.get("/:id", getResource);

/**
 * @swagger
 * /resources:
 *   post:
 *     summary: Create a new resource
 *     tags: [Resources]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewResource'
 *     responses:
 *       201:
 *         description: The resource was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       500:
 *         description: Some server error
 */
resourceRoute.post("/", createResource);

/**
 * @swagger
 * /resources/{id}:
 *   put:
 *     summary: Update the resource by the id
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The resource id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       200:
 *         description: The resource was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Resource'
 *       404:
 *         description: The resource was not found
 *       500:
 *         description: Some server error
 */
resourceRoute.put("/:id", updateResource);

/**
 * @swagger
 * /resources/{id}:
 *   delete:
 *     summary: Remove the resource by id
 *     tags: [Resources]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The resource id
 *     responses:
 *       204:
 *         description: The resource was deleted
 *       404:
 *         description: The resource was not found
 */
resourceRoute.delete("/:id", deleteResource);
