// Augment NextAuth types so session/user/JWT carry our id + role.
import type { DefaultSession } from "next-auth";

type Role = "ADMIN" | "EDITOR" | "MEMBER";

declare module "next-auth" {
  interface User {
    role?: Role;
  }
  interface Session {
    user: {
      id: string;
      role?: Role;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: Role;
  }
}
