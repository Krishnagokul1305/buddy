import { ApiService } from "./api.service"
import type { Note } from "@/types/note"

// Response types
interface NotesResponse {
  success: boolean
  data: Note[]
  message?: string
}

interface NoteResponse {
  success: boolean
  data: Note
  message?: string
}

export class NotesService extends ApiService {
  // Get all notes for current user
  async getNotes(token: string): Promise<Note[]> {
    try {
      const response = await this.get<NotesResponse>("api/notes/", token)
      if (response.success) {
        return response.data || []
      }
      return []
    } catch (error) {
      console.error("Get notes error:", error)
      return []
    }
  }

  // Get a single note by ID
  async getNote(noteId: number | string, token: string): Promise<Note | null> {
    try {
      const response = await this.get<NoteResponse>(`api/notes/${noteId}`, token)
      if (response.success) {
        return response.data
      }
      return null
    } catch (error) {
      console.error("Get note error:", error)
      return null
    }
  }

  // Create a new note
  async createNote(noteData: Partial<Note>, token: string): Promise<Note | null> {
    try {
      const response = await this.post<NoteResponse>("api/notes/", noteData, token)
      if (response.success) {
        return response.data
      }
      return null
    } catch (error) {
      console.error("Create note error:", error)
      return null
    }
  }

  // Update an existing note
  async updateNote(noteId: number | string, noteData: Partial<Note>, token: string): Promise<Note | null> {
    try {
      const response = await this.put<NoteResponse>(`api/notes/${noteId}`, noteData, token)
      if (response.success) {
        return response.data
      }
      return null
    } catch (error) {
      console.error("Update note error:", error)
      return null
    }
  }

  // Delete a note
  async deleteNote(noteId: number | string, token: string): Promise<boolean> {
    try {
      const response = await this.delete<{ success: boolean }>(`api/notes/${noteId}`, token)
      return response.success
    } catch (error) {
      console.error("Delete note error:", error)
      return false
    }
  }

  // Get a public note by slug
  async getPublicNote(slug: string): Promise<Note | null> {
    try {
      const response = await this.get<NoteResponse>(`api/public/${slug}`)
      if (response.success) {
        return response.data
      }
      return null
    } catch (error) {
      console.error("Get public note error:", error)
      return null
    }
  }
}

// Create singleton instance
export const notesService = new NotesService()
