import { ApiService } from "./api.service"
import type { UserProfile, UserBasic } from "@/types/user"

// Response types
interface UserProfileResponse {
  success: boolean
  data: UserProfile
  message?: string
}

interface UserBasicResponse {
  success: boolean
  data: UserBasic
  message?: string
}

export class UserService extends ApiService {
  // Get user profile by ID
  async getUserProfile(userId: number, token: string): Promise<UserProfile | null> {
    try {
      const response = await this.get<UserProfileResponse>(`api/user/basic/${userId}`, token)
      if (response.success) {
        return response.data
      }
      return null
    } catch (error) {
      console.error("Get user profile error:", error)
      return null
    }
  }

  // Update user profile
  async updateUserProfile(userId: number, data: Partial<UserProfile>, token: string): Promise<UserProfile | null> {
    try {
      const response = await this.put<UserProfileResponse>(`api/user/${userId}`, data, token)
      if (response.success) {
        return response.data
      }
      return null
    } catch (error) {
      console.error("Update user profile error:", error)
      return null
    }
  }

  // Register new user
  async registerUser(userData: any): Promise<boolean> {
    try {
      const response = await this.post<{ success: boolean }>(`api/user/`, userData)
      return response.success
    } catch (error) {
      console.error("Register user error:", error)
      return false
    }
  }

  // Get current user profile
  async getCurrentUserProfile(token: string): Promise<UserProfile | null> {
    try {
      // First get the basic user info to get the ID
      const userBasic = await this.get<UserBasicResponse>(`api/user/me`, token)

      if (!userBasic.success || !userBasic.data) {
        return null
      }

      // Then get the full profile using the ID
      return this.getUserProfile(userBasic.data.id, token)
    } catch (error) {
      console.error("Get current user profile error:", error)
      return null
    }
  }
}

// Create singleton instance
export const userService = new UserService()
