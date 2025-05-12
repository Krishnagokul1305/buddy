// Helper functions for API calls

// Add authorization header to fetch requests
export const fetchWithAuth = (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("auth_token")

  if (!token) {
    throw new Error("No authentication token found")
  }

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  })
}

// Handle API responses
export const handleApiResponse = async (response: Response) => {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || "An error occurred")
  }

  return data
}
