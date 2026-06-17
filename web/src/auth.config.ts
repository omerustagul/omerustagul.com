// Edge-safe auth config — shared by middleware (no Prisma/bcrypt here).
// The Node-only Credentials provider lives in auth.ts.
import type { NextAuthConfig } from "next-auth";

const ADMIN_ROLES = ["ADMIN", "EDITOR"];

export const authConfig = {
  // Trust the deploy host (Vercel sets it; required for self-hosted/localhost
  // under `next start`). Override per-env with AUTH_TRUST_HOST if needed.
  trustHost: true,
  pages: { signIn: "/login" },
  providers: [], // populated in auth.ts
  callbacks: {
    // Used by middleware/proxy to gate routes. Return true=allow,
    // false=redirect to signIn, or a Response for a custom redirect.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = auth?.user?.role;
      const isAdminArea = nextUrl.pathname.startsWith("/admin");

      if (isAdminArea) {
        if (!isLoggedIn) return false; // → /login
        if (!ADMIN_ROLES.includes(role ?? "")) {
          // logged in but lacks privilege → bounce to home
          return Response.redirect(new URL("/", nextUrl));
        }
      }
      return true;
    },
    // jwt + session live here (edge-safe, no Prisma/bcrypt) so the proxy can
    // read `role` too — not just the Node auth handler.
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "ADMIN" | "EDITOR" | "MEMBER" | undefined;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
