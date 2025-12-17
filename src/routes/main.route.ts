import { Router } from "express";
import { authRoute } from "../auth/auth.route";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { permissionRoute } from "../permission/permission.route";
import { projectRoute } from "../project/project.route";
import { roleRoute } from "../role/role.route";
import { userRoute } from "../user/user.route";

const mainRoute = Router();

mainRoute.use("/auth", authRoute);
mainRoute.use("/users", AuthMiddleware, userRoute);
mainRoute.use("/projects", AuthMiddleware, projectRoute);
mainRoute.use("/roles", AuthMiddleware, roleRoute);
mainRoute.use("/permissions", AuthMiddleware, permissionRoute);
export { mainRoute };
