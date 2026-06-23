-- CreateIndex
CREATE UNIQUE INDEX "Booking_active_slot_key" ON "Booking"("slot") WHERE ("status" != 'cancelled');
