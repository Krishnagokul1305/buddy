import { auth } from "@/lib/auth";
import prisma from "../lib/prisma";
import { Note } from "@/types/note";

class NotesService {
  async getUserNotes() {
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
