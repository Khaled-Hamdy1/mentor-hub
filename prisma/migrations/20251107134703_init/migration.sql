/*
  Warnings:

  - You are about to drop the column `platform` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `profile_social_links` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `profile_social_links` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."profile_social_links_userId_platform_key";

-- AlterTable
ALTER TABLE "profile_social_links" DROP COLUMN "platform",
DROP COLUMN "url",
ADD COLUMN     "behance" TEXT,
ADD COLUMN     "dribbble" TEXT,
ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "pinterest" TEXT,
ADD COLUMN     "telegram" TEXT,
ADD COLUMN     "whatsapp" TEXT,
ADD COLUMN     "x" TEXT,
ADD COLUMN     "youtube" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "profile_social_links_userId_key" ON "profile_social_links"("userId");
