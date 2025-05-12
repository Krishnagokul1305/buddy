import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggleEnhanced } from "@/components/theme-toggle-enhanced"
import { ArrowRight, BookOpen, Briefcase, GraduationCap } from "lucide-react"
// Add the API URL Config component
import { ApiUrlConfig } from "@/components/api-url-config"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span>PlacementBuddy</span>
          </div>
          {/* Add it to the header next to the theme toggle */}
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Register</Button>
            </Link>
            <ThemeToggleEnhanced />
            <ApiUrlConfig />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 hero-gradient">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Your Journey to Success Starts Here
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    PlacementBuddy helps you organize your placement journey, track your progress, and achieve your
                    career goals.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="group">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] animate-slide-in">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-64 w-64 rounded-full bg-primary/20 animate-pulse"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-48 w-48 rounded-full bg-primary/30 animate-pulse [animation-delay:500ms]"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full bg-primary/40 animate-pulse [animation-delay:1000ms]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to track your placement journey
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Profile Management</h3>
                  <p className="text-muted-foreground">Manage your academic and personal information in one place</p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Notes & Resources</h3>
                  <p className="text-muted-foreground">Create and share notes with markdown and code highlighting</p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4 rounded-lg border bg-card p-6 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Social Integration</h3>
                  <p className="text-muted-foreground">Connect your GitHub, LeetCode, and LinkedIn profiles</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} PlacementBuddy. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
