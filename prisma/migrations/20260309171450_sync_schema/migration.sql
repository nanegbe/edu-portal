/*
  Warnings:

  - You are about to drop the column `isActive` on the `Term` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Term" DROP COLUMN "isActive",
ADD COLUMN     "status" "YearStatus" NOT NULL DEFAULT 'UPCOMING';
