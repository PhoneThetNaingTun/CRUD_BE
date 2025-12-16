import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import {
  createOneProduct,
  deleteOneProduct,
  findOneProduct,
  updateOneProduct,
} from "../services/product.service";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await prisma.product.findMany({
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    });
    const totalCount = await prisma.product.count();
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json({ data: products, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product_name, price, description } = req.body;
    if (!product_name) throw new Error("Product name is required");
    if (!price) throw new Error("Price is required");

    const newProduct = await createOneProduct({
      product_name,
      price,
      description,
    });

    res
      .status(200)
      .json({ message: `${newProduct.product_name} created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { product_name, price, description } = req.body;

    if (!product_name)
      return res.status(400).json({ message: "Product name is required" });
    if (!price) return res.status(400).json({ message: "Price is required" });

    const product = await findOneProduct(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const updatedProduct = await updateOneProduct({
      id,
      product_name,
      price,
      description,
    });

    res.status(200).json({ message: `Product updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await findOneProduct(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const deletedProduct = await deleteOneProduct(id);

    res
      .status(200)
      .json({ message: `${deletedProduct.product_name} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createProduct, deleteProduct, getAllProducts, updateProduct };
