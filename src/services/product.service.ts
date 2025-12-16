import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const findOneProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return product;
};

export const createOneProduct = async (product: Prisma.ProductCreateInput) => {
  const newProduct = await prisma.product.create({
    data: product,
  });
  return newProduct;
};

export const updateOneProduct = async (product: Prisma.ProductUpdateInput) => {
  const updatedProduct = await prisma.product.update({
    data: { ...product },
    where: { id: product.id as string },
  });
  return updatedProduct;
};

export const deleteOneProduct = async (id: string) => {
  const deletedProduct = await prisma.product.delete({
    where: { id },
  });
  return deletedProduct;
};
