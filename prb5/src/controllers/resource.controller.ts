import { Request, Response } from "express";
import * as resourceService from "../services/resource.service";

export const getResources = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const filters = req.query;
    const resources = await resourceService.listResources(filters);
    res.status(200).json(resources);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const getResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resourceId = parseInt(req.params.id);
    const resource = await resourceService.getResource(resourceId);
    if (resource) {
      res.status(200).json(resource);
    } else {
      res.status(404).json({ message: "Resource not found" });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const createResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log({ req });
    const resourceData = req.body;
    const newResource = await resourceService.createResource(resourceData);
    res.status(201).json(newResource);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const updateResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resourceId = parseInt(req.params.id);
    const updatedData = req.body;
    const updatedResource = await resourceService.updateResource(
      resourceId,
      updatedData
    );
    if (updatedResource) {
      res.status(200).json(updatedResource);
    } else {
      res.status(404).json({ message: "Resource not found" });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};

export const deleteResource = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resourceId = parseInt(req.params.id);
    await resourceService.deleteResource(resourceId);
    res.status(204).send();
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: errorMessage });
  }
};
