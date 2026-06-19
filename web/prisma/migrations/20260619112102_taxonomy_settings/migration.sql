-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "instructor" TEXT,
ADD COLUMN     "level" TEXT,
ADD COLUMN     "topic" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "format" TEXT,
ADD COLUMN     "seller" TEXT,
ADD COLUMN     "type" TEXT;

-- CreateTable
CREATE TABLE "AppSettings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "data" JSONB NOT NULL,

    CONSTRAINT "AppSettings_pkey" PRIMARY KEY ("id")
);
