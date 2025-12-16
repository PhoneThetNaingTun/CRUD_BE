import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller";

const productRoute = Router();

productRoute.get("/all", getAllProducts);
productRoute.post("/create", createProduct);
productRoute.patch("/:id", updateProduct);
productRoute.delete("/:id", deleteProduct);

export { productRoute };
