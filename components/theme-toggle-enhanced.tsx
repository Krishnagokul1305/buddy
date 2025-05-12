"use client"

import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggleEnhanced() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="rounded-full w-9 h-9">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const currentTheme = theme || "system"

  const themeIcons = {
    light: <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />,
    dark: <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />,
    system: <Monitor className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />,
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-9 h-9 border-primary/20 bg-background hover:bg-muted transition-colors"
              >
                {themeIcons[currentTheme as keyof typeof themeIcons]}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-scale-in">
              <DropdownMenuItem
                onClick={() => setTheme("light")}
                className={`flex items-center gap-2 cursor-pointer ${currentTheme === "light" ? "bg-muted" : ""}`}
              >
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-2 cursor-pointer ${currentTheme === "dark" ? "bg-muted" : ""}`}
              >
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className={`flex items-center gap-2 cursor-pointer ${currentTheme === "system" ? "bg-muted" : ""}`}
              >
                <Monitor className="h-4 w-4" />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Current theme: {currentTheme}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
