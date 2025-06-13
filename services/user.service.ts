import { auth } from "@/lib/auth";
import type { UserData } from "@/types/user";
import prisma from "@/lib/prisma";
import { saltAndHashPassword, verifyPassword } from "@/lib/utils";
import { User } from "next-auth";

export class UserService {
  async getCurrentUserProfile(): Promise<UserData | null> {
    try {
      const session = await auth();
      if (!session?.user?.email) {
        return null;
      }
      const user: UserData | null = (await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      })) as UserData;

      if (!user) {
        return null;
      }
      return user;
    } catch (error) {
      console.error("Get current user profile error:", error);
      return null;
    }
  }

  async updateUserProfile(userData: UserData) {
    try {
      const session = await auth();
      if (!session?.user?.email) {
        return null;
      }
      const { id, ...rest } = userData;
      await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: { ...rest, year_of_study: rest.year_of_study + "" },
      });
      return true;
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
      throw error;
    }
  }

  async searchUsers(query: string) {
  try {
    const users:UserData[]|null = await prisma.user.findMany({
      where: {
        OR: [
          {
            name: {
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
    }) as UserData[];

    return users;
  } catch (error) {
    throw error;
  }
}

}

export const userService = new UserService();
