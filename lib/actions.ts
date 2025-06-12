"use server";

import { signIn, signOut } from "./auth";
import { saltAndHashPassword } from "./utils";
import prisma from "./prisma";
import { UserData } from "@/types/user";
import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";
import { Note, NotesFormValues } from "@/types/note";
import { notesService } from "@/services/notes.service";

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

export async function updateUser(userData: UserData) {
  await userService.updateUserProfile(userData);
  revalidatePath("/profile");
}

export async function createNoteAction(noteData: NotesFormValues) {
  await notesService.createNote(noteData);
  revalidatePath("/notes");
}

export async function deleteNoteAction(noteId: number) {
  await notesService.deleteNote(noteId);
  revalidatePath("/notes");
}

export async function updateNoteAction(
  noteId: number,
  noteData: NotesFormValues
) {
  await notesService.updateNote(noteId, noteData);
  revalidatePath("/notes");
}
