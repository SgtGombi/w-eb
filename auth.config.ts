import type { NextAuthConfig, DefaultSession } from "next-auth";

type AuthUser = {
  id: string;
  role?: string;
  shelter_id?: number | null;
  shelter_image?: string | null;
};

type AuthToken = {
  id?: string;
  role?: string;
  shelter_id?: number | null;
  shelter_image?: string | null;
  [k: string]: unknown;
};

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/admin/signin",
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
          shelter_image: u.shelter_image,
        } as AuthToken;
      }
      return token as AuthToken;
    },
    session({ session, token }) {
      const user = session.user as DefaultSession["user"] & {
        id?: string;
        role?: string;
        shelter_id?: number | null;
        shelter_image?: string | null;
      };

      const t = token as AuthToken;
      if (t.id) user.id = t.id;
      if (t.role) user.role = t.role;
      user.shelter_id = t.shelter_id ?? null;
      user.shelter_image = t.shelter_image ?? null;

      return session;
    },
  },
} satisfies NextAuthConfig;
