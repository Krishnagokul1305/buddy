import { auth } from "@/lib/auth";
import prisma from "../lib/prisma";
import { Note, NotesFormValues } from "@/types/note";
import { generateSlug } from "@/lib/utils";
import { UserData } from "@/types/user";

class NotesService {
  async getUserNotes(): Promise<Note[] | null> {
    try {
      const session = await auth();
      if (!session?.user) {
        return null;
      }

      if (!session.user.id) {
        return null;
      }

      const notes = await prisma.note.findMany({
        where: {
          userId: Number(session.user.id),
        },
      });
      return notes;
    } catch (error) {
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
        return null;
      }

      if (!session.user.id) {
        return null;
      }
      const data = await prisma.note.create({
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
        return null;
      }

      if (!session.user.id) {
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
        return null;
      }

      if (!session.user.id) {
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
      return null;
    }
  }

  async getNotesSharedToUser(): Promise<Note[] | null> {
    try {
      const session = await auth();
      if (!session?.user) {
        return null;
      }

      if (!session.user.id) {
        return null;
      }

      const notes = await prisma.note.findMany({
        where: {
          sharedWithUsers: {
            some: {
              id: +session.user.id,
            },
          },
        },
      });

      return notes;
    } catch (error) {
      return null;
    }
  }

  async shareNoteWithUser(noteId: number, userId: number) {
    try {
      const updatedNote = await prisma.note.update({
        where: { id: noteId },
        data: {
          sharedWithUsers: {
            connect: { id: userId },
          },
        },
        include: {
          sharedWithUsers: true,
        },
      });

      return updatedNote;
    } catch (error) {
      throw error;
    }
  }

  async getSharedUsers(noteId: number): Promise<UserData[] | null> {
    try {
      const note = await prisma.note.findUnique({
        where: { id: noteId },
        select: {
          sharedWithUsers: {
            select: {
              id: true,
              username: true,
              email: true,
              name: true,
            },
          },
        },
      });

      return note?.sharedWithUsers ?? null;
    } catch (error) {
      return null;
    }
  }
  async removeSharedUser(noteId: number, userId: number): Promise<boolean> {
    try {
      await prisma.note.update({
        where: { id: noteId },
        data: {
          sharedWithUsers: {
            disconnect: { id: userId },
          },
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const notesService = new NotesService();
