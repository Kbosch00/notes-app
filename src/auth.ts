import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/src/prisma/db";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (
          typeof email !== "string" ||
          typeof password !== "string" ||
          !email.trim() ||
          !password
        ) {
          return null;
        }

        const user = await db.orm.public.User.where({
          email: email.trim().toLowerCase(),
        }).first();

        if (!user?.passwordHash) {
          return null;
        }

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
          return null;
        }

        return {
          id: String(user.id),
          email: user.email,
          name: user.name ?? undefined,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user?.id && account?.provider === "credentials") {
        token.id = user.id;
        return token;
      }
      if (account?.provider === "google" && token.email) {
        const email = token.email.toLowerCase();
        let dbUser = await db.orm.public.User.where({ email }).first();

        if (!dbUser) {
          dbUser = await db.orm.public.User.create({
            email,
            name: token.name ?? null,
            passwordHash: null,
          });
        }

        token.id = String(dbUser.id);
      } else if (user?.id) {
        token.id = user.id;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
