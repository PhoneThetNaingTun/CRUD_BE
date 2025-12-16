import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const RoleMiddleware =
  (...allowedRoles: Role[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (req.user.role === "ADMIN") return next();

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
