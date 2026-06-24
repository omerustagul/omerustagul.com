-- Double-booking koruması artık uygulama düzeyinde Postgres advisory lock ile sağlanıyor
-- (bkz. createBooking). Önceki kısmi unique index (Booking_active_slot_key) Prisma 7'nin
-- migrate diff'i ile sürekli çatıştığından kaldırılıyor.
-- DropIndex
DROP INDEX IF EXISTS "Booking_active_slot_key";
