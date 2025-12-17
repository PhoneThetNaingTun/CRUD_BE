import { Router } from "express";
import { PermissionMiddleware } from "../middleware/permission.middleware";
import { validateSchema } from "../middleware/validation.middleware";
import {
  createRole,
  deleteRole,
  getAllRole,
  getRole,
  updateRole,
} from "./role.controller";
import { createRoleSchema, updateRoleSchema } from "./schema/role.schema";

const roleRoute = Router();

roleRoute.get("/all", getAllRole);
roleRoute.get("/:id", getRole);
roleRoute.post(
  "/create",
  PermissionMiddleware("role:create"),
  validateSchema(createRoleSchema),
  createRole
);
roleRoute.patch(
  "/:id",
  PermissionMiddleware("role:update"),
  validateSchema(updateRoleSchema),
  updateRole
);
roleRoute.delete("/:id", PermissionMiddleware("role:delete"), deleteRole);

export { roleRoute };
