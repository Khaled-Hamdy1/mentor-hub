/*
  Warnings:

  - The `price` column on the `mentoring_session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `behance` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `dribbble` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `facebook` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `github` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `instagram` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `linkedin` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `pinterest` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `telegram` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `whatsapp` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `x` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the column `youtube` on the `profile_social_links` table. All the data in the column will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,platform]` on the table `profile_social_links` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platform` to the `profile_social_links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `profile_social_links` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `profile_social_links` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."mentoring_session" DROP CONSTRAINT "mentoring_session_menteeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."mentoring_session" DROP CONSTRAINT "mentoring_session_mentorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."profile" DROP CONSTRAINT "profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."profile_social_links" DROP CONSTRAINT "profile_social_links_profileId_fkey";

-- DropForeignKey
ALTER TABLE "public"."review" DROP CONSTRAINT "review_menteeId_fkey";

-- DropForeignKey
ALTER TABLE "public"."review" DROP CONSTRAINT "review_mentorId_fkey";

-- DropIndex
DROP INDEX "public"."account_userId_key";

-- DropIndex
DROP INDEX "public"."profile_social_links_profileId_key";

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "mentoring_session" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "profile_social_links" DROP COLUMN "behance",
DROP COLUMN "dribbble",
DROP COLUMN "facebook",
DROP COLUMN "github",
DROP COLUMN "instagram",
DROP COLUMN "linkedin",
DROP COLUMN "pinterest",
DROP COLUMN "profileId",
DROP COLUMN "telegram",
DROP COLUMN "whatsapp",
DROP COLUMN "x",
DROP COLUMN "youtube",
ADD COLUMN     "platform" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "about" TEXT,
ADD COLUMN     "availableForMentoring" BOOLEAN DEFAULT false,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "hourlyRate" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "jobTitle" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "mentoringRate" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profileComplete" BOOLEAN DEFAULT false,
ADD COLUMN     "skills" TEXT,
ALTER COLUMN "emailVerified" SET DEFAULT false,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "banned" SET DEFAULT false;

-- DropTable
DROP TABLE "public"."profile";

-- DropEnum
DROP TYPE "public"."Gender";

-- CreateIndex
CREATE UNIQUE INDEX "profile_social_links_userId_platform_key" ON "profile_social_links"("userId", "platform");

-- AddForeignKey
ALTER TABLE "mentoring_session" ADD CONSTRAINT "mentoring_session_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentoring_session" ADD CONSTRAINT "mentoring_session_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_social_links" ADD CONSTRAINT "profile_social_links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
