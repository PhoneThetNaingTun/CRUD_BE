import argon from "argon2";
import dotenv from "dotenv";
import { config } from "../src/config/config";
import { prisma } from "../src/lib/prisma";
import { permissionList } from "./const/permissions";

dotenv.config();

async function main() {
  const tx = await prisma.$transaction(async (tx) => {
    const permissions = await Promise.all(
      permissionList.map((perm) =>
        tx.permission.upsert({
          where: { permission: perm },
          update: {},
          create: { permission: perm },
        })
      )
    );

    const adminRole = await tx.role.create({
      data: { role: "ADMIN" },
    });

    const permissionIds = permissions.map((p) => p.id);

    await tx.rolePermission.createMany({
      data: permissionIds.map((id) => ({
        role_id: adminRole.id,
        permission_id: id,
      })),
      skipDuplicates: true,
    });

    const hashedPassword = await argon.hash(config.ADMIN_PASSWORD);

    await tx.user.upsert({
      where: { email: config.ADMIN_EMAIL },
      update: { password: hashedPassword, role_id: adminRole.id },
      create: {
        name: "Admin",
        email: config.ADMIN_EMAIL,
        password: hashedPassword,
        role_id: adminRole.id,
      },
    });

    console.log("✅ Admin user and all permissions seeded successfully");
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
