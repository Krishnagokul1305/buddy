"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ArrowLeft, LogIn } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { ThemeToggleEnhanced } from "@/components/theme-toggle-enhanced"
import { ApiUrlConfig } from "@/components/api-url-config"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/profile")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl animate-fade-in">
            <BookOpen className="h-6 w-6" />
            <span>PlacementBuddy</span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggleEnhanced />
            <ApiUrlConfig />
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-8 bg-gradient-to-b from-background to-muted/30">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50 animate-float"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl opacity-50 animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <Card className="w-full max-w-md animate-scale-in card-hover">
          <CardHeader className="space-y-1">
            <div className="w-full flex justify-center mb-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-in">
                <LogIn className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
            <CardDescription className="text-center">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <div className="p-3 text-sm text-white bg-destructive rounded animate-shake">{error}</div>}
              <div className="space-y-2 animate-slide-up stagger-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-field-animation"
                />
              </div>
              <div className="space-y-2 animate-slide-up stagger-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-field-animation"
                />
              </div>
              <Button type="submit" className="w-full animate-slide-up stagger-3 btn-hover-effect" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground animate-fade-in stagger-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Register
              </Link>
            </div>
            <Link
              href="/"
              className="flex items-center text-sm text-muted-foreground hover:text-foreground animate-fade-in stagger-5"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to home
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
