import { ApiService } from "./api.service"
import type { UserBasic } from "@/types/user"

// Response types
interface LoginResponse {
  success: boolean
  data: {
    token: string
  }
  message?: string
}

interface UserResponse {
  success: boolean
  data: UserBasic
  message?: string
}

export class AuthService extends ApiService {
  // Login user and get token
  async login(email: string, password: string): Promise<string | null> {
    try {
      const response = await this.post<LoginResponse>("api/login", {
        email,
        password_hash: password,
      })

      if (response.success) {
        return response.data.token
      }
      return null
    } catch (error) {
      console.error("Login error:", error)
      return null
    }
  }

  // Logout user
  async logout(token: string): Promise<boolean> {
    try {
      await this.post<any>("api/logout", {}, token)
      return true
    } catch (error) {
      console.error("Logout error:", error)
      return false
    }
  }

  // Get current user details using token
  async getCurrentUser(token: string): Promise<UserBasic | null> {
    try {
      const response = await this.get<UserResponse>("api/user/me", token)
      if (response.success) {
        return response.data
      }
      return null
    } catch (error) {
      console.error("Get current user error:", error)
      return null
    }
  }

  // Validate token
  async validateToken(token: string): Promise<boolean> {
    try {
      const user = await this.getCurrentUser(token)
      return !!user
    } catch (error) {
      console.error("Token validation error:", error)
      return false
    }
  }
}

// Create singleton instance
export const authService = new AuthService()
