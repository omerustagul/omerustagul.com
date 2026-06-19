-- AlterTable
ALTER TABLE "Lead" ADD COLUMN     "budget" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "priority" TEXT,
ADD COLUMN     "source" TEXT,
ALTER COLUMN "status" SET DEFAULT 'Yeni';
