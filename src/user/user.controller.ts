import argon from "argon2";
import { Request, Response } from "express";
import { findOneUserByEmail } from "../auth/auth.service";
import { prisma } from "../lib/prisma";
import {
  createOneUser,
  deleteOneUser,
  findOneUser,
  updateOneUser,
} from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const users = await prisma.user.findMany({
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
      },
    });
    const totalCount = await prisma.user.count();
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json({ data: users, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const isExist = await findOneUserByEmail(email);
    if (isExist)
      return res.status(400).json({ message: "Email already exist" });
    const hash = await argon.hash(password);

    const newUser = await createOneUser({
      name,
      email,
      password: hash,
      role,
    });

    res.status(200).json({ message: `${newUser.name} created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, role, email } = req.body;

    const User = await findOneUser(id);
    if (!User) return res.status(404).json({ message: "User not found" });

    const isExist = await prisma.user.findUnique({
      where: { email, NOT: { id } },
    });

    if (isExist)
      return res.status(400).json({ message: "Email already exist" });

    const updatedUser = await updateOneUser({
      id,
      name,
      password,
      role,
      email,
    });

    res.status(200).json({ message: `User updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const User = await findOneUser(id);
    if (!User) return res.status(404).json({ message: "User not found" });

    const deletedUser = await deleteOneUser(id);

    res
      .status(200)
      .json({ message: `${deletedUser.name} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createUser, deleteUser, getAllUsers, updateUser };
