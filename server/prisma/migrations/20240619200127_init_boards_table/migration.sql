-- CreateTable
CREATE TABLE "Board" (
    "boardId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("boardId")
);
