import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyAccessToken, verifyRefreshToken } from "../auth/auth.service";

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
    req.user = decoded as JwtPayload;
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
    req.user = decoded as JwtPayload;
    next();
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
