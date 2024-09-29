/*
  Warnings:

  - A unique constraint covering the columns `[accessId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "accessId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Client_accessId_key" ON "Client"("accessId");
