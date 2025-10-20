-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('PENDING', 'REJECTED', 'COMPLETED', 'CANCELLED', 'UPCOMING');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" TEXT,
    "banned" BOOLEAN,
    "banReason" TEXT,
    "banExpires" TIMESTAMP(3),
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "streamRegistered" BOOLEAN DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "gender" TEXT,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "location" TEXT,
    "jobTitle" TEXT,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "about" TEXT,
    "skills" TEXT,
    "availableForMentoring" BOOLEAN DEFAULT false,
    "streamRegistered" BOOLEAN DEFAULT false,
    "role" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_social_links" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "facebook" TEXT,
    "instagram" TEXT,
    "telegram" TEXT,
    "whatsapp" TEXT,
    "x" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "behance" TEXT,
    "dribbble" TEXT,
    "youtube" TEXT,
    "pinterest" TEXT,

    CONSTRAINT "profile_social_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,
    "impersonatedBy" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mentoring_session" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT,
    "thumbnail" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" "SessionStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "mentorId" TEXT NOT NULL,
    "menteeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mentoring_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "description" TEXT,
    "sessionId" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "menteeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "profile_email_key" ON "profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_social_links_profileId_key" ON "profile_social_links"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "session"("token");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profile_social_links" ADD CONSTRAINT "profile_social_links_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentoring_session" ADD CONSTRAINT "mentoring_session_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mentoring_session" ADD CONSTRAINT "mentoring_session_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "mentoring_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
