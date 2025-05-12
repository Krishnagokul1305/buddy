import { API_BASE_URL } from "@/lib/config"

// Base API service for common functionality
export class ApiService {
  protected baseUrl: string

  constructor() {
    this.baseUrl = API_BASE_URL
  }

  // Helper to build full API URLs
  protected getUrl(endpoint: string): string {
    return `${this.baseUrl}/${endpoint}`
  }

  // Generic GET request with authorization
  protected async get<T>(endpoint: string, token?: string): Promise<T> {
    const headers: HeadersInit = {}
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(this.getUrl(endpoint), {
      method: "GET",
      headers,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Generic POST request with authorization
  protected async post<T>(endpoint: string, data: any, token?: string): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(this.getUrl(endpoint), {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Generic PUT request with authorization
  protected async put<T>(endpoint: string, data: any, token?: string): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(this.getUrl(endpoint), {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Generic DELETE request with authorization
  protected async delete<T>(endpoint: string, token?: string): Promise<T> {
    const headers: HeadersInit = {}
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(this.getUrl(endpoint), {
      method: "DELETE",
      headers,
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }
}
