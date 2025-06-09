import { auth } from "@/lib/auth";
import type { UserData } from "@/types/user";
import prisma from "@/lib/prisma";

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
}

// Create singleton instance
export const userService = new UserService();
