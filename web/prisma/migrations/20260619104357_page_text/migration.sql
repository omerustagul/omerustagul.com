-- CreateTable
CREATE TABLE "PageText" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "data" JSONB NOT NULL,

    CONSTRAINT "PageText_pkey" PRIMARY KEY ("id")
);
