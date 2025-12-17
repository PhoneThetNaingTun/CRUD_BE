import { Router } from "express";

import { getAllPermissions } from "./permission.controller";

const permissionRoute = Router();

permissionRoute.get("/all", getAllPermissions);

export { permissionRoute };
