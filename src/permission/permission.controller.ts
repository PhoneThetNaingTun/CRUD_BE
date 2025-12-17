import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const getAllPermissions = async (req: Request, res: Response) => {
  try {
    const permissions = await prisma.permission.findMany({
      orderBy: { created_at: "desc" },
    });
    res.status(200).json({ data: permissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getAllPermissions };
