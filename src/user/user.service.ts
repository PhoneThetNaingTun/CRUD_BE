import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const findOneUser = async (id: string) => {
  const User = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return User;
};

export const createOneUser = async (User: Prisma.UserCreateInput) => {
  const newUser = await prisma.user.create({
    data: User,
  });
  return newUser;
};

export const updateOneUser = async (User: Prisma.UserUpdateInput) => {
  const updatedUser = await prisma.user.update({
    data: { ...User },
    where: { id: User.id as string },
  });
  return updatedUser;
};

export const deleteOneUser = async (id: string) => {
  const deletedUser = await prisma.user.delete({
    where: { id },
  });
  return deletedUser;
};
