/*
  Warnings:

  - You are about to drop the column `accessId` on the `Client` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accessId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Client_accessId_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "accessId";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "accessId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Project_accessId_key" ON "Project"("accessId");
