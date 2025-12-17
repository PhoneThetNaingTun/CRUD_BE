import { Router } from "express";
import { PermissionMiddleware } from "../middleware/permission.middleware";
import { validateSchema } from "../middleware/validation.middleware";
import { createUserSchema, updateUserSchema } from "./schema/user.schema";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
  updateUserStatus,
} from "./user.controller";

const userRoute = Router();

userRoute.get("/all", PermissionMiddleware("user:read"), getAllUsers);
userRoute.post(
  "/create",
  PermissionMiddleware("user:create"),
  validateSchema(createUserSchema),
  createUser
);
userRoute.patch(
  "/:id",
  PermissionMiddleware("user:update"),
  validateSchema(updateUserSchema),
  updateUser
);
userRoute.patch(
  "/status/:id",
  PermissionMiddleware("user:update"),
  updateUserStatus
);

userRoute.delete("/:id", PermissionMiddleware("user:delete"), deleteUser);

export { userRoute };
