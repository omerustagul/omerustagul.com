import { listBookings, getBookingConfig } from "@/lib/actions/bookings";
import { BookingsClient } from "./client";

export default async function BookingsPage() {
  const [bookings, config] = await Promise.all([listBookings(), getBookingConfig()]);
  const rows = bookings.map((b) => ({
    id: b.id,
    name: b.name,
    email: b.email,
    phone: b.phone,
    topic: b.topic,
    type: b.type,
    message: b.message,
    slot: b.slot.toISOString(),
    status: b.status,
  }));
  return <BookingsClient initialBookings={rows} initialConfig={config} />;
}
