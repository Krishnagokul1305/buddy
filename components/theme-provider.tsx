"use client"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"
import { THEME_SETTINGS } from "@/lib/config"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={THEME_SETTINGS.defaultTheme}
      enableSystem
      disableTransitionOnChange
      storageKey={THEME_SETTINGS.storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
