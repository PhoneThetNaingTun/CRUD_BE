import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const findOneRole = async (id: string) => {
  const role = await prisma.role.findUnique({
    where: { id },
  });
  return role;
};

export const createOneRole = async (role: Prisma.RoleCreateInput) => {
  const newRole = await prisma.role.create({
    data: { ...role },
  });
  return newRole;
};

export const deleteOneRole = async (id: string) => {
  const deletedRole = await prisma.role.delete({
    where: { id },
  });
  return deletedRole;
};
