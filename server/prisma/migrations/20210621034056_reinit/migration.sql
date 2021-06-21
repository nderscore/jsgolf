-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CREATOR', 'PUBLISHER', 'MODERATOR', 'ADMINISTRATOR');

-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('DRAFT', 'PROPOSED', 'PUBLISHED', 'REJECTED', 'DELETED');

-- CreateEnum
CREATE TYPE "VoteValue" AS ENUM ('UP', 'DOWN');

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateLimit" (
    "id" TEXT NOT NULL,
    "timestamps" TIMESTAMP(3)[],
    "expiresAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "githubId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "roles" "Role"[],

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" TIMESTAMP(3),
    "authorId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "setupCode" TEXT NOT NULL,
    "testCode" TEXT NOT NULL,
    "status" "ChallengeStatus" NOT NULL,
    "rejectionReason" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solution" (
    "challengeId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "code" TEXT NOT NULL,
    "size" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Vote" (
    "challengeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "value" "VoteValue" NOT NULL,
    "reason" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "User.githubId_unique" ON "User"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "Solution.challengeId_authorId_unique" ON "Solution"("challengeId", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Vote.challengeId_userId_unique" ON "Vote"("challengeId", "userId");

-- AddForeignKey
ALTER TABLE "Challenge" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solution" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
