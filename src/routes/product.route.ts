import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller";
import { AuthMiddleware } from "../middleware/auth.middleware";

const productRoute = Router();

productRoute.get("/all", AuthMiddleware, getAllProducts);
productRoute.post("/create", createProduct);
productRoute.patch("/:id", updateProduct);
productRoute.delete("/:id", deleteProduct);

export { productRoute };
