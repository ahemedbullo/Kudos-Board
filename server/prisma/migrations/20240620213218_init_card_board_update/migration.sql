-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "author" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "voteCount" INTEGER,
ALTER COLUMN "author" DROP NOT NULL;
