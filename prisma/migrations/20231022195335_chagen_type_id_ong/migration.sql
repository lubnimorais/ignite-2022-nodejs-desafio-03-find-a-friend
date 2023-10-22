/*
  Warnings:

  - The primary key for the `ongs` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ongs" DROP CONSTRAINT "ongs_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ongs_pkey" PRIMARY KEY ("id");
