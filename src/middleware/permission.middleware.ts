import { NextFunction, Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const PermissionMiddleware =
  (...requiredPermissions: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
          role: {
            select: {
              rolePermissions: {
                select: {
                  permission: {
                    select: {
                      permission: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!user?.role) {
        return res.status(403).json({ message: "User has no role assigned" });
      }

      const userPermissions = user.role.rolePermissions.map(
        (rp) => rp.permission.permission
      );

      const hasPermission = requiredPermissions.every((p) =>
        userPermissions.includes(p)
      );

      if (!hasPermission) {
        return res.status(403).json({ message: "Permission denied" });
      }

      next();
    } catch (error) {
      console.error("Permission middleware error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
