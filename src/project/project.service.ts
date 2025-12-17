import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const findOneProject = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
  });
  return project;
};

export const createOneProject = async (project: Prisma.ProjectCreateInput) => {
  const newProject = await prisma.project.create({
    data: { ...project },
  });
  return newProject;
};
