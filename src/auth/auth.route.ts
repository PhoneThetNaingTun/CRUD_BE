import { Router } from "express";
import {
  AuthMiddleware,
  RefreshMiddleware,
} from "../middleware/auth.middleware";
import { validateSchema } from "../middleware/validation.middleware";
import { getMe, login, refreshToken, register } from "./auth.controller";
import { loginSchema, registerSchema } from "./schema/auth.schema";

const authRoute = Router();

authRoute.post("/login", validateSchema(loginSchema), login);
authRoute.post("/register", validateSchema(registerSchema), register);
authRoute.post("/refresh", RefreshMiddleware, refreshToken);
authRoute.get("/me", AuthMiddleware, getMe);

export { authRoute };
