"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ArrowLeft } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from "date-fns"
import { ThemeToggleEnhanced } from "@/components/theme-toggle-enhanced"
import { notesService } from "@/services/notes.service"
import type { Note } from "@/types/note"

export default function SharedNotePage() {
  const params = useParams()
  const slug = params?.slug as string
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!slug) return

        const publicNote = await notesService.getPublicNote(slug)

        if (publicNote) {
          setNote(publicNote)
        } else {
          setError("Note not found or is not public")
        }
      } catch (err) {
        setError("An error occurred while fetching the note")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [slug])

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy")
    } catch (error) {
      return "Invalid date"
    }
  }

  const renderMarkdown = (content: string) => {
    // This is a simple implementation
    // In a real app, you would use a proper markdown renderer with syntax highlighting
    return content
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span>PlacementBuddy</span>
          </Link>
          <ThemeToggleEnhanced />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/notes" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to notes
          </Link>

          {loading ? (
            <Card className="animate-pulse">
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/3" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="animate-scale-in">
              <CardHeader>
                <CardTitle>Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{error}</p>
                <Button asChild className="mt-4 btn-hover-effect animate-fade-in">
                  <Link href="/notes">Go back to notes</Link>
                </Button>
              </CardContent>
            </Card>
          ) : note ? (
            <Card className="animate-scale-in card-hover">
              <CardHeader>
                <CardTitle className="text-2xl">{note.title}</CardTitle>
                <CardDescription>Shared on {formatDate(note.created_at)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none animate-fade-in">{renderMarkdown(note.content)}</div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </main>
    </div>
  )
}
