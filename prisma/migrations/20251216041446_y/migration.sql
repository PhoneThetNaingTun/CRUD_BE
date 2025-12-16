/*
  Warnings:

  - You are about to drop the column `descriptoin` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "descriptoin",
ADD COLUMN     "description" TEXT;
