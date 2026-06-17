// Route protection (Next.js 16 "proxy" convention — replaces middleware.ts).
// Runs the edge-safe authConfig; its `authorized` callback gates /admin.
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

// Next 16 requires a function as the default (or named `proxy`) export.
export default auth;

export const config = {
  matcher: ["/admin/:path*"],
};
