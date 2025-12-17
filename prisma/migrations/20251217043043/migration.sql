/*
  Warnings:

  - You are about to drop the column `user_id` on the `RolePermission` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[permission]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role_permission_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RolePermission" DROP CONSTRAINT "RolePermission_user_id_fkey";

-- AlterTable
ALTER TABLE "RolePermission" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role_permission_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Permission_permission_key" ON "Permission"("permission");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_permission_id_fkey" FOREIGN KEY ("role_permission_id") REFERENCES "RolePermission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
