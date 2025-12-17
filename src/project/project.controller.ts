import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

const getAllProjects = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const projects = await prisma.project.findMany({
      orderBy: { created_at: "desc" },
      skip,
      take: limit,
    });
    const totalCount = await prisma.project.count();
    const totalPages = Math.ceil(totalCount / limit);
    res.status(200).json({ data: projects, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createProject = async (req: Request, res: Response) => {
  try {
    const { name, start_date, end_date } = req.body;

    const newProject = await prisma.project.create({
      data: {
        name,
        start_date,
        end_date,
      },
    });
    res
      .status(200)
      .json({ message: `${newProject.name} created successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createProject, getAllProjects };
