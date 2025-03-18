-- AlterTable
ALTER TABLE "Skin" ADD COLUMN     "rarity" TEXT NOT NULL DEFAULT 'common',
ADD COLUMN     "stattrak" BOOLEAN NOT NULL DEFAULT false;
