import { Router } from "express";
import { validateSchema } from "../middleware/validation.middleware";

import { PermissionMiddleware } from "../middleware/permission.middleware";
import { createProject, getAllProjects } from "./project.controller";
import { createProjectSchema } from "./schema/project.schema";

const projectRoute = Router();

projectRoute.get("/all", PermissionMiddleware("project:read"), getAllProjects);
projectRoute.post(
  "/create",
  PermissionMiddleware("project:create"),
  validateSchema(createProjectSchema),
  createProject
);

export { projectRoute };
