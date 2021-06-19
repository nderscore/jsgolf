-- CreateTable
CREATE TABLE "RateLimit" (
    "id" TEXT NOT NULL,
    "timestamps" INTEGER[],
    "expiresAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
