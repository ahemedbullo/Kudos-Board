-- CreateTable
CREATE TABLE "Card" (
    "cardId" SERIAL NOT NULL,
    "cardTitle" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "gif" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "boardId" INTEGER NOT NULL,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("cardId")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "Board"("boardId") ON DELETE RESTRICT ON UPDATE CASCADE;
