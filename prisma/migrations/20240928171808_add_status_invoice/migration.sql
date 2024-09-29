-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('DRAFT', 'SENT', 'PAID');

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "status" "InvoiceStatus" NOT NULL DEFAULT 'DRAFT';
