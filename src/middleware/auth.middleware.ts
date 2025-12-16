import { NextFunction, Request, Response } from "express";
import {
  findOneUserById,
  verifyAccessToken,
  verifyRefreshToken,
} from "../auth/auth.service";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = await verifyAccessToken(token);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    const user = await findOneUserById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const RefreshMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
    const decoded = await verifyRefreshToken(token);
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded as any;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
