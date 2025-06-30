import { auth } from "@/lib/auth";
import prisma from "../lib/prisma";
import {
  Access,
  AccessLevel,
  Note,
  NotesFormValues,
  NoteWithAccess,
  RecentlySharedNote,
} from "@/types/note";
import { generateSlug } from "@/lib/utils";
import { UserData } from "@/types/user";
import { subDays } from "date-fns";

class NotesService {
  async getUserNotes(userId: number, search?: string): Promise<Note[] | null> {
    try {
      const notes = await prisma.note.findMany({
        where: {
          authorId: userId,
          ...(search
            ? {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {}),
        },
      });
      return notes;
    } catch (error) {
      console.error("Failed to fetch notes:", error);
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
          authorId: +session.user.id,
          shareSlug: generateSlug(noteData.title),
        },
      });
      console.log(data);
    } catch (error) {
      console.log(error);
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

  async getNoteBySlug(slug: string, userId: number): Promise<Note | null> {
    try {
      const note = await prisma.note.findUnique({
        where: {
          shareSlug: slug,
        },
        include: {
          NoteShare: {
            where: {
              userId,
            },
          },
        },
      });

      if (!note) return null;

      const isAuthor = note.authorId === userId;
      const isPublic = note.isPublic;
      const hasAccess = note.NoteShare.length > 0;

      if (isAuthor || isPublic || hasAccess) {
        return note;
      }

      return null;
    } catch (error) {
      console.error("Error fetching note:", error);
      return null;
    }
  }

  async getNotesSharedToUser(
    userId: number,
    search?: string
  ): Promise<NoteWithAccess[] | null> {
    try {
      const notes = await prisma.note.findMany({
        where: {
          NoteShare: {
            some: {
              userId,
            },
          },
          ...(search
            ? {
                title: {
                  contains: search,
                  mode: "insensitive",
                },
              }
            : {}),
        },
        include: {
          NoteShare: {
            where: {
              userId,
            },
            select: {
              access: true,
            },
          },
        },
      });

      const mappedNotes = notes.map((note) => ({
        id: note.id,
        title: note.title,
        content: note.content,
        shareSlug: note.shareSlug,
        isPublic: note.isPublic,
        authorId: note.authorId,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
        access: note.NoteShare[0]?.access ?? AccessLevel.VIEW,
      }));

      return mappedNotes;
    } catch (error) {
      console.error("Failed to fetch shared notes:", error);
      return null;
    }
  }

  async shareNoteWithUser(noteId: number, userId: number, access: Access) {
    try {
      const noteShare = await prisma.noteShare.upsert({
        where: {
          noteId_userId: {
            noteId,
            userId,
          },
        },
        update: {
          access,
        },
        create: {
          noteId,
          userId,
          access,
        },
      });

      return noteShare;
    } catch (error) {
      console.error("Error sharing note:", error);
      throw error;
    }
  }

  async getSharedUsers(noteId: number): Promise<UserData[] | null> {
    try {
      const shares = await prisma.noteShare.findMany({
        where: { noteId },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              username: true,
            },
          },
        },
      });

      return shares.map((share) => share.user);
    } catch (error) {
      console.error("Error fetching shared users:", error);
      return null;
    }
  }

  async getNoteStats(userId: number) {
    const [totalNotes, privateNotes, publicNotes, sharedToMe] =
      await Promise.all([
        prisma.note.count({ where: { authorId: userId } }),
        prisma.note.count({ where: { authorId: userId, isPublic: false } }),
        prisma.note.count({ where: { authorId: userId, isPublic: true } }),
        prisma.noteShare.count({ where: { userId } }),
      ]);

    return {
      totalNotes,
      privateNotes,
      publicNotes,
      sharedToMe,
    };
  }

  async removeSharedUser(noteId: number, userId: number): Promise<boolean> {
    try {
      await prisma.noteShare.delete({
        where: {
          noteId_userId: {
            noteId,
            userId,
          },
        },
      });
      return true;
    } catch (error) {
      console.error("Error removing shared user:", error);
      return false;
    }
  }

  async getRecentNotes(userId: number): Promise<Note[] | null> {
    const sevenDaysAgo = subDays(new Date(), 7);

    return (await prisma.note.findMany({
      where: {
        authorId: userId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        isPublic: true,
      },
    })) as Note[];
  }

  async getRecentlySharedNotes(
    userId: number
  ): Promise<RecentlySharedNote[] | null> {
    const shares = await prisma.noteShare.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        createdAt: true,
        access: true,
        note: {
          select: {
            id: true,
            title: true,
            author: {
              select: {
                username: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            email: true,
          },
        },
      },
    });

    if (!shares.length) return null;

    return shares.map((share) => ({
      id: share.note.id,
      title: share.note.title,
      sharedBy: share.note.author.username,
      sharedWith: share.user.email,
      sharedDate: share.createdAt.toISOString(),
      access: share.access,
    }));
  }
}

export const notesService = new NotesService();
