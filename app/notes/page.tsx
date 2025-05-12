"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { BookOpen, Plus, Edit, Trash2, Share, Eye, Lock, LogOut, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { format } from "date-fns"
import { ThemeToggleEnhanced } from "@/components/theme-toggle-enhanced"
import { useAuth } from "@/components/auth-provider"
import { notesService } from "@/services/notes.service"
import type { Note, NoteFormData } from "@/types/note"

export default function NotesPage() {
  const { token, logout } = useAuth()
  const router = useRouter()
  const [notes, setNotes] = useState<Note[]>([])
  const [sharedNotes, setSharedNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState<Note | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<NoteFormData>({
    title: "",
    content: "",
    is_public: false,
  })

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }

    const fetchNotes = async () => {
      try {
        const userNotes = await notesService.getNotes(token)
        setNotes(userNotes)
      } catch (error) {
        console.error("Error fetching notes:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
    // In a real app, you would fetch shared notes from the API
    setSharedNotes([])
  }, [token, router])

  const handleCreateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_public: checked }))
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (!token) return

      const newNote = await notesService.createNote(formData, token)

      if (newNote) {
        setNotes((prev) => [...prev, newNote])
        setIsCreateDialogOpen(false)
        setFormData({
          title: "",
          content: "",
          is_public: false,
        })
      }
    } catch (error) {
      console.error("Error creating note:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!currentNote || !token) return

    try {
      const updatedNote = await notesService.updateNote(currentNote.id, formData, token)

      if (updatedNote) {
        setNotes((prev) => prev.map((note) => (note.id === currentNote.id ? updatedNote : note)))
        setIsEditDialogOpen(false)
      }
    } catch (error) {
      console.error("Error updating note:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!token) return

    try {
      const success = await notesService.deleteNote(id, token)

      if (success) {
        setNotes((prev) => prev.filter((note) => note.id !== id))
      }
    } catch (error) {
      console.error("Error deleting note:", error)
    }
  }

  const openEditDialog = (note: Note) => {
    setCurrentNote(note)
    setFormData({
      title: note.title,
      content: note.content,
      is_public: note.is_public,
    })
    setIsEditDialogOpen(true)
  }

  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content
    return content.substring(0, maxLength) + "..."
  }

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

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <BookOpen className="h-6 w-6" />
              <span>PlacementBuddy</span>
            </Link>
            <div className="flex items-center gap-4">
              <ThemeToggleEnhanced />
            </div>
          </div>
        </header>

        <main className="flex-1 container py-8">
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">My Notes</h1>
              <Skeleton className="h-10 w-32" />
            </div>

            <Tabs defaultValue="my-notes" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </TabsList>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6" />
            <span>PlacementBuddy</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Profile
              </Button>
            </Link>
            <ThemeToggleEnhanced />
            <Button variant="ghost" size="icon" onClick={logout}>
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Notes</h1>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 btn-hover-effect animate-fade-in">
                  <Plus className="h-4 w-4" />
                  Create Note
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] animate-scale-in">
                <DialogHeader>
                  <DialogTitle>Create New Note</DialogTitle>
                  <DialogDescription>Add a new note to your collection</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div className="space-y-2 animate-slide-up stagger-1">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleCreateChange}
                      placeholder="Note title"
                      required
                      className="form-field-animation"
                    />
                  </div>
                  <div className="space-y-2 animate-slide-up stagger-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      name="content"
                      value={formData.content}
                      onChange={handleCreateChange}
                      placeholder="Write your note content here... You can use Markdown for formatting."
                      rows={10}
                      required
                      className="form-field-animation font-mono"
                    />
                  </div>
                  <div className="flex items-center space-x-2 animate-slide-up stagger-3">
                    <Switch id="is_public" checked={formData.is_public} onCheckedChange={handleSwitchChange} />
                    <Label htmlFor="is_public">Make this note public</Label>
                  </div>
                  <DialogFooter>
                    <Button type="submit" className="btn-hover-effect animate-fade-in">
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
                          Creating...
                        </>
                      ) : (
                        "Create Note"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="my-notes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="my-notes" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                My Notes
              </TabsTrigger>
              <TabsTrigger value="shared-notes" className="flex items-center gap-2">
                <Share className="h-4 w-4" />
                Shared Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-notes" className="pt-6 tab-transition">
              {notes.length === 0 ? (
                <div className="text-center py-12 animate-fade-in">
                  <BookOpen className="h-16 w-16 mx-auto mb-6 text-muted-foreground/30 animate-float" />
                  <h2 className="text-xl font-medium mb-2">No notes yet</h2>
                  <p className="text-muted-foreground mb-6">Create your first note to get started</p>
                  <Button onClick={() => setIsCreateDialogOpen(true)} className="btn-hover-effect animate-bounce-in">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Note
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notes.map((note, index) => (
                    <Card
                      key={note.id}
                      className="overflow-hidden flex flex-col h-full group card-hover animate-scale-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl">{note.title}</CardTitle>
                          <Badge variant={note.is_public ? "default" : "outline"} className="ml-2">
                            {note.is_public ? <Eye className="h-3 w-3 mr-1" /> : <Lock className="h-3 w-3 mr-1" />}
                            {note.is_public ? "Public" : "Private"}
                          </Badge>
                        </div>
                        <CardDescription>Created on {formatDate(note.created_at)}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3 flex-grow">
                        <div className="text-muted-foreground">{truncateContent(note.content)}</div>
                      </CardContent>
                      <CardFooter className="pt-0 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditDialog(note)}
                          className="btn-hover-effect"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="outline" size="sm" className="text-destructive btn-hover-effect">
                              <Trash2 className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="animate-scale-in">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete your note.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="btn-hover-effect">Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(note.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 btn-hover-effect"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="shared-notes" className="pt-6 tab-transition">
              {sharedNotes.length === 0 ? (
                <div className="text-center py-12">
                  <Share className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                  <h2 className="text-xl font-medium mb-2">No shared notes</h2>
                  <p className="text-muted-foreground">Shared notes from other users will appear here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sharedNotes.map((note) => (
                    <Card key={note.id} className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>{note.title}</CardTitle>
                        <CardDescription>Shared on {formatDate(note.created_at)}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="prose dark:prose-invert">{renderMarkdown(note.content)}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] animate-scale-in">
            <DialogHeader>
              <DialogTitle>Edit Note</DialogTitle>
              <DialogDescription>Make changes to your note</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2 animate-slide-up stagger-1">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={formData.title}
                  onChange={handleCreateChange}
                  placeholder="Note title"
                  required
                  className="form-field-animation"
                />
              </div>
              <div className="space-y-2 animate-slide-up stagger-2">
                <Label htmlFor="edit-content">Content</Label>
                <Textarea
                  id="edit-content"
                  name="content"
                  value={formData.content}
                  onChange={handleCreateChange}
                  placeholder="Write your note content here... You can use Markdown for formatting."
                  rows={10}
                  required
                  className="form-field-animation font-mono"
                />
              </div>
              <div className="flex items-center space-x-2 animate-slide-up stagger-3">
                <Switch id="edit-is_public" checked={formData.is_public} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="edit-is_public">Make this note public</Label>
              </div>
              <DialogFooter>
                <Button type="submit" className="btn-hover-effect animate-fade-in">
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
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
