import { Router } from "express";
import { authRoute } from "../auth/auth.route";
import { productRoute } from "./product.route";

const mainRoute = Router();

mainRoute.use("/products", productRoute);
mainRoute.use("/auth", authRoute);
export { mainRoute };
