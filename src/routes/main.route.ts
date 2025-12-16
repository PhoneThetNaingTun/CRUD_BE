import { Role } from "@prisma/client";
import { Router } from "express";
import { authRoute } from "../auth/auth.route";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { RoleMiddleware } from "../middleware/role.middleware";
import { userRoute } from "../user/user.route";

const mainRoute = Router();

mainRoute.use("/auth", authRoute);
mainRoute.use(
  "/users",
  AuthMiddleware,
  RoleMiddleware(Role.DEVELOPER),
  userRoute
);
export { mainRoute };
