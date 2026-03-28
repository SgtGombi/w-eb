import type { NextAuthConfig, DefaultSession } from "next-auth";

type AuthUser = {
  id: string;
  role?: string;
  shelter_id?: number | null;
};

type AuthToken = {
  id?: string;
  role?: string;
  shelter_id?: number | null;
  [k: string]: unknown;
};

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user && typeof user === "object" && "id" in user) {
        const u = user as AuthUser;
        return {
          ...(token as Record<string, unknown>),
          id: u.id,
          role: u.role,
          shelter_id: u.shelter_id,
        } as AuthToken;
      }
      return token as AuthToken;
    },
    session({ session, token }) {
      const user = session.user as DefaultSession["user"] & {
        id?: string;
        role?: string;
        shelter_id?: number | null;
      };

      const t = token as AuthToken;
      if (t.id) user.id = t.id;
      if (t.role) user.role = t.role;
      user.shelter_id = t.shelter_id ?? null;

      return session;
    },
  },
} satisfies NextAuthConfig;
