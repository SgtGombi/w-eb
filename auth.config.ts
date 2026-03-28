import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.shelter_id = (user as any).shelter_id;
      }
      return token;
    },
    session({ session, token }) {
      (session.user as any).id = token.id;
      (session.user as any).role = token.role;
      (session.user as any).shelter_id = token.shelter_id ?? null;
      return session;
    },
  },
} satisfies NextAuthConfig;
