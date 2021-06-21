/*
  Warnings:

  - You are about to drop the column `created` on the `Challenge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Challenge" DROP COLUMN "created",
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
