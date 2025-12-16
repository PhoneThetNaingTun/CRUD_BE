import { Router } from "express";
import { productRoute } from "./product.route";

const mainRoute = Router();

mainRoute.use("/products", productRoute);

export { mainRoute };
