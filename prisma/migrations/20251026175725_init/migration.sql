/*
  Warnings:

  - The `gender` column on the `profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `dateOfBirth` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "dateOfBirth",
DROP COLUMN "phone";

-- CreateIndex
CREATE UNIQUE INDEX "account_userId_key" ON "account"("userId");
