import { Role } from "@prisma/client";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { prisma } from "../lib/prisma";
import { AccessTokenPayload } from "./types/auth.type";

export const findOneUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};
export const findOneUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: { name: true, email: true, role: true, id: true },
  });
  return user;
};

export const generateToken = async ({
  id,
  role,
}: {
  id: string;
  role: Role;
}) => {
  const payload = { id, role };
  const accessToken = jwt.sign(payload, config.ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ id }, config.REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export const verifyAccessToken = async (
  token: string
): Promise<AccessTokenPayload> => {
  const decoded = jwt.verify(token, config.ACCESS_SECRET);

  return decoded as AccessTokenPayload;
};

export const verifyRefreshToken = async (token: string) => {
  return jwt.verify(token, config.REFRESH_SECRET);
};
