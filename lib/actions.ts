"use server";

import { signIn, signOut } from "./auth";
import { saltAndHashPassword } from "./utils";
import prisma from "./prisma";
import { UserData } from "@/types/user";

export async function signInAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (error) {
    throw error;
  }
}

export async function signUpAction(userData: UserData) {
  try {
    console.log(userData);
    const { username, email, password, ...optionalFields } = userData;

    if (!username || !email || !password) {
      throw new Error("Username, email, and password are required.");
    }

    const password_hash = await saltAndHashPassword(password);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: password_hash,
        ...optionalFields,
      },
    });
    console.log(user);
  } catch (error) {
    throw error;
  }
}

export async function signOutAction() {
  await signOut();
}
