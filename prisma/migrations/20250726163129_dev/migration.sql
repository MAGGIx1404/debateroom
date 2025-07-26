/*
  Warnings:

  - The values [THINKER,ANALYST,ORATOR,STRATEGIST] on the enum `Rank` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `AIPersona` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Argument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Badge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Debate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DebateCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DebateSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DebateSummary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Leaderboard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Rank_new" AS ENUM ('NOVICE', 'CHALLENGER', 'ELITE', 'MASTERMIND', 'LEGEND');
ALTER TABLE "User" ALTER COLUMN "rank" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "rank" TYPE "Rank_new" USING ("rank"::text::"Rank_new");
ALTER TYPE "Rank" RENAME TO "Rank_old";
ALTER TYPE "Rank_new" RENAME TO "Rank";
DROP TYPE "Rank_old";
ALTER TABLE "User" ALTER COLUMN "rank" SET DEFAULT 'NOVICE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Argument" DROP CONSTRAINT "Argument_debateId_fkey";

-- DropForeignKey
ALTER TABLE "Argument" DROP CONSTRAINT "Argument_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Argument" DROP CONSTRAINT "Argument_userId_fkey";

-- DropForeignKey
ALTER TABLE "Badge" DROP CONSTRAINT "Badge_argumentId_fkey";

-- DropForeignKey
ALTER TABLE "Debate" DROP CONSTRAINT "Debate_aiPersonaId_fkey";

-- DropForeignKey
ALTER TABLE "Debate" DROP CONSTRAINT "Debate_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "DebateCard" DROP CONSTRAINT "DebateCard_debateId_fkey";

-- DropForeignKey
ALTER TABLE "DebateSettings" DROP CONSTRAINT "DebateSettings_debateId_fkey";

-- DropForeignKey
ALTER TABLE "DebateSummary" DROP CONSTRAINT "DebateSummary_debateId_fkey";

-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_userId_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_debateId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_teamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bannerUrl" TEXT,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "rank" SET DEFAULT 'NOVICE';

-- DropTable
DROP TABLE "AIPersona";

-- DropTable
DROP TABLE "Argument";

-- DropTable
DROP TABLE "Badge";

-- DropTable
DROP TABLE "Debate";

-- DropTable
DROP TABLE "DebateCard";

-- DropTable
DROP TABLE "DebateSettings";

-- DropTable
DROP TABLE "DebateSummary";

-- DropTable
DROP TABLE "Leaderboard";

-- DropTable
DROP TABLE "Team";

-- DropTable
DROP TABLE "TeamMember";

-- DropEnum
DROP TYPE "BadgeType";

-- DropEnum
DROP TYPE "DebateFormat";

-- DropEnum
DROP TYPE "DebateType";

-- DropEnum
DROP TYPE "TeamRole";

-- DropEnum
DROP TYPE "TeamSide";

-- DropEnum
DROP TYPE "VotingSystem";
