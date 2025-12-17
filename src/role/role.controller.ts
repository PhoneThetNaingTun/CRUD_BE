import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { deleteOneRole, findOneRole } from "./role.service";

const getAllRole = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const roles = await prisma.role.findMany({
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    });
    const totalCount = await prisma.role.count();
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json({ data: roles, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await findOneRole(id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.status(200).json({ data: role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createRole = async (req: Request, res: Response) => {
  try {
    const { role, permissionIds } = req.body as {
      role: string;
      permissionIds: string[];
    };

    const newRole = await prisma.$transaction(async (tx) => {
      const newRole = await tx.role.create({
        data: { role },
      });

      await tx.rolePermission.createMany({
        data: permissionIds.map((id) => ({
          role_id: newRole.id,
          permission_id: id,
        })),
      });

      return newRole;
    });

    res.status(200).json({ message: `${newRole.role} created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const role = await deleteOneRole(id);

    res.status(200).json({ message: `${role.role} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createRole, deleteRole, getAllRole, getRole };
