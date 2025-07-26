-- CreateEnum
CREATE TYPE "DebateType" AS ENUM ('AI_ONLY', 'AI_PLUS_PEOPLE');

-- CreateEnum
CREATE TYPE "DebateFormat" AS ENUM ('RAPID_FIRE', 'OPEN_FLOOR', 'ONE_VS_ONE', 'CASE_STUDY');

-- CreateEnum
CREATE TYPE "VotingSystem" AS ENUM ('COMMUNITY', 'CREATOR_ONLY', 'AI_BASED');

-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('FACT_VERIFIED', 'POTENTIAL_MISINFORMATION', 'AI_OPINION');

-- CreateEnum
CREATE TYPE "Rank" AS ENUM ('THINKER', 'ANALYST', 'ORATOR', 'STRATEGIST');

-- CreateEnum
CREATE TYPE "TeamSide" AS ENUM ('PRO', 'CON');

-- CreateEnum
CREATE TYPE "TeamRole" AS ENUM ('LEAD', 'REBUTTAL', 'SUMMARY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "rank" "Rank" NOT NULL DEFAULT 'THINKER',
    "points" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Debate" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "type" "DebateType" NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "creatorId" TEXT NOT NULL,
    "aiPersonaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Debate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Argument" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "userId" TEXT,
    "debateId" TEXT NOT NULL,
    "parentId" TEXT,
    "isAI" BOOLEAN NOT NULL DEFAULT false,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Argument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebateSettings" (
    "id" TEXT NOT NULL,
    "debateId" TEXT NOT NULL,
    "votingSystem" "VotingSystem" NOT NULL DEFAULT 'COMMUNITY',
    "maxParticipants" INTEGER,
    "durationMinutes" INTEGER,
    "format" "DebateFormat" NOT NULL DEFAULT 'OPEN_FLOOR',
    "tags" TEXT[],

    CONSTRAINT "DebateSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebateCard" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "debateId" TEXT NOT NULL,

    CONSTRAINT "DebateCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "side" "TeamSide" NOT NULL,
    "debateId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "TeamRole" NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIPersona" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tone" TEXT NOT NULL,

    CONSTRAINT "AIPersona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "argumentId" TEXT NOT NULL,
    "type" "BadgeType" NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DebateSummary" (
    "id" TEXT NOT NULL,
    "debateId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "aiFeedback" TEXT NOT NULL,

    CONSTRAINT "DebateSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leaderboard" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Leaderboard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DebateSettings_debateId_key" ON "DebateSettings"("debateId");

-- CreateIndex
CREATE UNIQUE INDEX "AIPersona_name_key" ON "AIPersona"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DebateSummary_debateId_key" ON "DebateSummary"("debateId");

-- AddForeignKey
ALTER TABLE "Debate" ADD CONSTRAINT "Debate_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debate" ADD CONSTRAINT "Debate_aiPersonaId_fkey" FOREIGN KEY ("aiPersonaId") REFERENCES "AIPersona"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Argument" ADD CONSTRAINT "Argument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Argument" ADD CONSTRAINT "Argument_debateId_fkey" FOREIGN KEY ("debateId") REFERENCES "Debate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Argument" ADD CONSTRAINT "Argument_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Argument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebateSettings" ADD CONSTRAINT "DebateSettings_debateId_fkey" FOREIGN KEY ("debateId") REFERENCES "Debate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebateCard" ADD CONSTRAINT "DebateCard_debateId_fkey" FOREIGN KEY ("debateId") REFERENCES "Debate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_debateId_fkey" FOREIGN KEY ("debateId") REFERENCES "Debate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_argumentId_fkey" FOREIGN KEY ("argumentId") REFERENCES "Argument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DebateSummary" ADD CONSTRAINT "DebateSummary_debateId_fkey" FOREIGN KEY ("debateId") REFERENCES "Debate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
