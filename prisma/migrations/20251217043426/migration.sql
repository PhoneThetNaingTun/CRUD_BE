/*
  Warnings:

  - You are about to drop the column `role_permission_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `role_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_permission_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role_permission_id",
ADD COLUMN     "rolePermissionId" TEXT,
ADD COLUMN     "role_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rolePermissionId_fkey" FOREIGN KEY ("rolePermissionId") REFERENCES "RolePermission"("id") ON DELETE SET NULL ON UPDATE CASCADE;
