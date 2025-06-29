import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "./utils";
import prisma from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (typeof email !== "string" || typeof password !== "string") {
          throw new Error("Invalid credentials format");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isValid = await verifyPassword(password, user.password);

        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: String(user.id),
          username: user.username,
          email: user.email,
        };
        // const dummyUser = {
        //   id: "1",
        //   email: "dummy@example.com",
        //   username: "DummyUser",
        //   password: "test1234", // plain text just for testing
        // };

        // if (email === dummyUser.email && password === dummyUser.password) {
        //   return {
        //     id: dummyUser.id,
        //     email: dummyUser.email,
        //     username: dummyUser.username,
        //   };
        // }
        // throw new Error("Invalid credentials");
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id);
        session.user.email = String(token.email);
      }
      return session;
    },
  },
});
