import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword, saltAndHashPassword } from "./utils";

const dummyUsers: {
  email: string;
  password: string;
  hashedPassword?: string;
}[] = [
  {
    email: "alice@example.com",
    password: "alice123",
  },
  {
    email: "bob@example.com",
    password: "bob123",
  },
];

let usersReady = false;
async function getUsers() {
  if (!usersReady) {
    for (const user of dummyUsers) {
      user.hashedPassword = await saltAndHashPassword(user.password);
    }
    usersReady = true;
  }
  return dummyUsers;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = await getUsers();
        const user = users.find((u) => u.email === credentials?.email);

        if (!user || !user.hashedPassword)
          throw new Error("Invalid credentials");

        const isValid = await verifyPassword(
          credentials!.password as string,
          user.hashedPassword
        );

        if (!isValid) throw new Error("Invalid credentials");

        // Return basic user object (must have `id` or `email`)
        return {
          id: user.email,
          email: user.email,
        };
      },
    }),
  ],
});
