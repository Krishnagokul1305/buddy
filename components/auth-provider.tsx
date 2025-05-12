"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { authService } from "@/services/auth.service"
import type { UserBasic } from "@/types/user"

type AuthContextType = {
  user: UserBasic | null
  token: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  login: async () => false,
  logout: async () => {},
  loading: true,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserBasic | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if we have a token in localStorage
    const storedToken = localStorage.getItem("auth_token")
    if (storedToken) {
      setToken(storedToken)
      // Fetch user data or validate token
      loadUserData(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Protect routes that require authentication
    const protectedRoutes = ["/profile", "/notes"]
    const isProtectedRoute = protectedRoutes.some((route) => pathname?.startsWith(route))

    if (isProtectedRoute && !loading && !token) {
      router.push("/login")
    }
  }, [pathname, token, loading, router])

  const loadUserData = async (authToken: string) => {
    try {
      const userData = await authService.getCurrentUser(authToken)

      if (userData) {
        setUser(userData)
      } else {
        // Token is invalid, clear it
        localStorage.removeItem("auth_token")
        setToken(null)
        setUser(null)
      }
    } catch (error) {
      console.error("Error loading user data:", error)
      localStorage.removeItem("auth_token")
      setToken(null)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const authToken = await authService.login(email, password)

      if (authToken) {
        localStorage.setItem("auth_token", authToken)
        setToken(authToken)

        // Load user data after successful login
        await loadUserData(authToken)
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    }
  }

  const logout = async () => {
    try {
      if (token) {
        await authService.logout(token)
      }
    } catch (error) {
      console.error("Logout error:", error)
    } finally {
      localStorage.removeItem("auth_token")
      setToken(null)
      setUser(null)
      router.push("/")
    }
  }

  return <AuthContext.Provider value={{ user, token, login, logout, loading }}>{children}</AuthContext.Provider>
}
