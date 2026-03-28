import NextAuth, { type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: { id: string; role: string; shelter_id: number | null } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Jelszó", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email as string },
        });

        if (!admin || !admin.active) return null;

        const valid = await bcrypt.compare(
          credentials.password as string,
          admin.password
        );
        if (!valid) return null;

        return {
          id: String(admin.id),
          name: admin.name,
          email: admin.email,
          role: admin.role,
          shelter_id: admin.shelter_id,
        };
      },
    }),
  ],
});