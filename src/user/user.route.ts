import { Router } from "express";
import { validateSchema } from "../middleware/validation.middleware";
import { createUserSchema, updateUserSchema } from "./schema/user.schema";
import {
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} from "./user.controller";

const userRoute = Router();

userRoute.get("/all", getAllUsers);
userRoute.post("/create", validateSchema(createUserSchema), createUser);
userRoute.patch("/:id", validateSchema(updateUserSchema), updateUser);
userRoute.delete("/:id", deleteUser);

export { userRoute };
