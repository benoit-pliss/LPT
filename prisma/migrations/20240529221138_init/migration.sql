/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `Sessions` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `Times` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Sessions" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "Times" DROP COLUMN "deleted_at",
ALTER COLUMN "id_session" SET DEFAULT 1;
