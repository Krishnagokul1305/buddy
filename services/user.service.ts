import { auth } from "@/lib/auth";
import type { UserData, UserProfile } from "@/types/user";
import prisma from "@/lib/prisma";
import { saltAndHashPassword, verifyPassword } from "@/lib/utils";

export class UserService {
  async getCurrentUserProfile(): Promise<UserProfile | null> {
    try {
      const session = await auth();
      if (!session?.user?.email) {
        return null;
      }
      const user: UserProfile | null = (await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })) as UserProfile;

      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      return null;
    }
  }

  async deleteAccount() {
    try {
      const session = await auth();
      if (!session?.user?.email) {
        throw new Error("User not found");
      }
      await prisma.user.delete({
        where: {
          email: session.user.email,
        },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(oldPassword: string, newPassword: string) {
    try {
      const session = await auth();
      if (!session?.user?.email) {
        return null;
      }
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await verifyPassword(oldPassword, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }

      const hashedPassword = await saltAndHashPassword(newPassword);
      await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          password: hashedPassword,
        },
      });
      return true;
    } catch (error) {
      throw error;
    }
  }

  async searchUsers(query: string) {
    try {
      const session = await auth();
      if (!session?.user?.email) return [];
      const users = await prisma.user.findMany({
        where: {
          AND: [
            {
              OR: [
                {
                  username: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
                {
                  email: {
                    contains: query,
                    mode: "insensitive",
                  },
                },
              ],
            },
            {
              email: {
                not: session.user.email,
              },
            },
          ],
        },
        select: {
          id: true,
          username: true,
          email: true,
        },
        take: 5,
      });

      return users;
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
