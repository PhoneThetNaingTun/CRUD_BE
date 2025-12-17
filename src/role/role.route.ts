import { Router } from "express";
import { PermissionMiddleware } from "../middleware/permission.middleware";
import { validateSchema } from "../middleware/validation.middleware";
import { createRole, deleteRole, getAllRole, getRole } from "./role.controller";
import { createRoleSchema } from "./schema/role.schema";

const roleRoute = Router();

roleRoute.get("/all", getAllRole);
roleRoute.get("/:id", getRole);
roleRoute.post(
  "/create",
  PermissionMiddleware("role:create"),
  validateSchema(createRoleSchema),
  createRole
);
roleRoute.delete("/:id", PermissionMiddleware("role:delete"), deleteRole);

export { roleRoute };
