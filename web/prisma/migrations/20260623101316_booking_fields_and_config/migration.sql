-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "message" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "topic" TEXT,
ADD COLUMN     "type" TEXT;

-- CreateTable
CREATE TABLE "BookingConfig" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "data" JSONB NOT NULL,

    CONSTRAINT "BookingConfig_pkey" PRIMARY KEY ("id")
);
