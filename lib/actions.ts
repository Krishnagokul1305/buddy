"use server";

import { signIn } from "./auth";

export async function signInAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  console.log(email, password);
  try {
    await signIn("credentials", { email, password });
  } catch (error) {
    console.log(error);
  }
}

export async function signUpAction() {}
