import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toLowerCase().trim();
        const password = credentials?.password;

        if (!email || !password) {
          return null;
        }

        const allowedAdmin = process.env.ADMIN_EMAIL?.toLowerCase().trim();
        if (!allowedAdmin || email !== allowedAdmin) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          const adminPassword = process.env.ADMIN_PASSWORD ?? "";
          const isAdminMatch = password === adminPassword;
          if (!isAdminMatch) {
            return null;
          }

          const passwordHash = await bcrypt.hash(adminPassword, 12);
          const created = await prisma.user.create({
            data: {
              email,
              name: "Admin",
              passwordHash,
            },
          });

          return {
            id: created.id,
            email: created.email,
            name: created.name ?? undefined,
            role: created.role,
          } as any;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role,
        } as any;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role ?? "ADMIN";
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        (session as any).role = token.role;
      }
      return session;
    },
  },
};
