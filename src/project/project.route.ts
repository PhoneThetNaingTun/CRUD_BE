import { Router } from "express";
import { validateSchema } from "../middleware/validation.middleware";

import { createProject, getAllProjects } from "./project.controller";
import { createProjectSchema } from "./schema/project.schema";

const projectRoute = Router();

projectRoute.get("/all", getAllProjects);
projectRoute.post(
  "/create",
  validateSchema(createProjectSchema),
  createProject
);

export { projectRoute };
