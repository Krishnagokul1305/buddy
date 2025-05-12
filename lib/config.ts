export const APP_NAME = "PlacementBuddy"
export const APP_DESCRIPTION = "A platform to help you track your placement journey"

// Update the API_BASE_URL to check localStorage first
export const API_BASE_URL =
  typeof window !== "undefined" && localStorage.getItem("api_base_url")
    ? (localStorage.getItem("api_base_url") as string)
    : process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3000"

export const apiUrl = (endpoint: string) => `${API_BASE_URL}/${endpoint}`

export const THEME_SETTINGS = {
  defaultTheme: "system",
  storageKey: "placement-buddy-theme",
}
