import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/config";
import { prisma } from "../lib/prisma";

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
    select: { name: true, email: true, role: true },
  });
  return user;
};

export const generateToken = async ({ sub }: JwtPayload) => {
  const payload = { sub };
  const accessToken = jwt.sign(payload, config.ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign(payload, config.REFRESH_SECRET, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

export const verifyAccessToken = async (token: string) => {
  return jwt.verify(token, config.ACCESS_SECRET);
};

export const verifyRefreshToken = async (token: string) => {
  return jwt.verify(token, config.REFRESH_SECRET);
};
