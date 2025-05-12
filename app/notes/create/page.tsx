"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ArrowLeft, Save, Eye } from "lucide-react"
import { ThemeToggleEnhanced } from "@/components/theme-toggle-enhanced"
import { useAuth } from "@/components/auth-provider"
import { MarkdownPreview } from "@/components/markdown-renderer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { notesService } from "@/services/notes.service"
import type { NoteFormData } from "@/types/note"

export default function CreateNotePage() {
  const { token } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("write")

  const [formData, setFormData] = useState<NoteFormData>({
    title: "",
    content: "",
    is_public: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_public: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (!token) {
        router.push("/login")
        return
      }

      const newNote = await notesService.createNote(formData, token)

      if (newNote) {
        router.push("/notes")
      } else {
        setError("Failed to create note")
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
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl animate-fade-in">
            <BookOpen className="h-6 w-6" />
            <span>PlacementBuddy</span>
          </Link>
          <ThemeToggleEnhanced />
        </div>
      </header>

      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/notes" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold">Create New Note</h1>
            </div>
          </div>

          <Card className="animate-scale-in">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Note Details</CardTitle>
                <CardDescription>Create a new note with markdown support</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && <div className="p-3 text-sm text-white bg-destructive rounded animate-shake">{error}</div>}

                <div className="space-y-2 animate-slide-up stagger-1">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Note title"
                    required
                    className="form-field-animation"
                  />
                </div>

                <div className="space-y-2 animate-slide-up stagger-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="content">Content</Label>
                    <div className="text-xs text-muted-foreground">Markdown supported</div>
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-2">
                      <TabsTrigger value="write" className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                        <span>Write</span>
                      </TabsTrigger>
                      <TabsTrigger value="preview" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="write" className="mt-0">
                      <Textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write your note content here... You can use Markdown for formatting."
                        rows={15}
                        required
                        className="form-field-animation font-mono resize-none"
                      />
                    </TabsContent>

                    <TabsContent value="preview" className="mt-0">
                      <div className="border rounded-md h-[360px] overflow-y-auto p-4">
                        {formData.content ? (
                          <MarkdownPreview content={formData.content} />
                        ) : (
                          <div className="flex items-center justify-center h-full text-muted-foreground">
                            <p>Nothing to preview</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="flex items-center space-x-2 animate-slide-up stagger-3">
                  <Switch id="is_public" checked={formData.is_public} onCheckedChange={handleSwitchChange} />
                  <Label htmlFor="is_public">Make this note public</Label>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" asChild>
                  <Link href="/notes">Cancel</Link>
                </Button>
                <Button type="submit" className="btn-hover-effect" disabled={isLoading}>
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
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Note
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
