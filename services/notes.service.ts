import { auth } from "@/lib/auth";
import prisma from "../lib/prisma";
import { Note, NotesFormValues } from "@/types/note";
import { generateSlug } from "@/lib/utils";

class NotesService {
  async getUserNotes(): Promise<Note[] | null> {
    try {
      const session = await auth();
      if (!session?.user) {
        console.warn("No user session found.");
        return null;
      }

      if (!session.user.id) {
        console.error("Session user ID is missing.");
        return null;
      }

      const notes = await prisma.note.findMany({
        where: {
          userId: Number(session.user.id),
        },
      });
      return notes;
    } catch (error) {
      console.error("Error fetching user notes:", error);
      return null;
    }
  }

  async getNoteById(id: number) {
    try {
      const note = await prisma.note.findUnique({
        where: {
          id,
        },
      });
      return note;
    } catch (error) {
      return null;
    }
  }

  async createNote(noteData: NotesFormValues) {
    try {
      const session = await auth();
      if (!session?.user) {
        console.warn("No user session found.");
        return null;
      }

      if (!session.user.id) {
        console.error("Session user ID is missing.");
        return null;
      }
      await prisma.note.create({
        data: {
          ...noteData,
          userId: +session.user.id,
          share_slug: generateSlug(noteData.title),
        },
      });
    } catch (error) {
      return null;
    }
  }

  async updateNote(noteId: number, noteData: NotesFormValues) {
    try {
      const session = await auth();
      if (!session?.user) {
        console.warn("No user session found.");
        return null;
      }

      if (!session.user.id) {
        console.error("Session user ID is missing.");
        return null;
      }

      await prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          ...noteData,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async deleteNote(id: number) {
    try {
      const session = await auth();
      if (!session?.user) {
        console.warn("No user session found.");
        return null;
      }

      if (!session.user.id) {
        console.error("Session user ID is missing.");
        return null;
      }
      await prisma.note.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async getNoteBySlug(slug: string): Promise<Note | null> {
    try {
      const note = await prisma.note.findUnique({
        where: {
          share_slug: slug,
        },
      });
      return note;
    } catch (error) {
      console.error("Error fetching note by slug:", error);
      return null;
    }
  }
}

export const notesService = new NotesService();
