/*
  Warnings:

  - You are about to drop the column `rolePermissionId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_rolePermissionId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "rolePermissionId";
