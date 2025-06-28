"use server";

import { signIn, signOut } from "./auth";
import { saltAndHashPassword } from "./utils";
import prisma from "./prisma";
import { UserData } from "@/types/user";
import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";
import { Access, Note, NotesFormValues } from "@/types/note";
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
    const { username, email, password } = userData;

    if (!username || !email || !password) {
      throw new Error("Username, email, and password are required.");
    }

    const password_hash = await saltAndHashPassword(password);

    await prisma.user.create({
      data: {
        username,
        email,
        password: password_hash,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function signOutAction() {
  await signOut();
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

export async function changePasswordAction(
  oldPassword: string,
  newPassword: string
) {
  await userService.changePassword(oldPassword, newPassword);
}

export async function deleteAccountAction() {
  await userService.deleteAccount();
  await signOut();
}

export async function shareNoteAction(
  noteId: number,
  userId: number,
  access: Access
) {
  await notesService.shareNoteWithUser(noteId, userId, access);
  revalidatePath("/notes/shared");
}

export async function removeSharedUserAction(
  noteId: number,
  userId: number,
  slug: string
) {
  await notesService.removeSharedUser(noteId, userId);
  revalidatePath(`/notes/shared/${slug}`);
}

export async function getCurrentUserAction() {
  return await userService.getCurrentUserProfile();
}
