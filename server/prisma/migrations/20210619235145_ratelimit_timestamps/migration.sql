/*
  Warnings:

  - The `timestamps` column on the `RateLimit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "RateLimit" DROP COLUMN "timestamps",
ADD COLUMN     "timestamps" TIMESTAMP(3)[];
