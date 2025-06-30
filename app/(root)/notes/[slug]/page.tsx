import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Search, Share2, Sparkles, Users } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { notesService } from "@/services/notes.service";
import { Note } from "@/types/note";
import ReusableModal from "@/components/ReusableModal";
import { UserSearchForm } from "@/components/UserSearchForm";
import SharedWithList from "@/components/SharedWithList";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import MarkDownPreviewer from "@/components/MarkDownPreviewer";
import BackButton from "@/components/BackButton";

export default async function SharedNotePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const session = await auth();
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId) return null;
  const note: Note | null = await notesService.getNoteBySlug(slug, userId);
  // const serialized = JSON.parse(note?.content ?? "{}");
  if (!note)
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-4">
        <Card className="w-full max-w-lg border-none shadow-none">
          <CardContent className="p-10">
            <div className="text-center space-y-8">
              {/* Animated search illustration */}
              <div className="relative mx-auto w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full opacity-20 animate-ping"></div>
                <div className="relative w-24 h-24 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full flex items-center justify-center">
                  <Search className="w-12 h-12 text-orange-600" />
                </div>
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-bounce" />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold ">Oops! Note Not Found</h1>
                  <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                    It seems like this note has wandered off into the digital
                    void. Don't worry, your other notes are safe and sound!
                  </p>
                </div>

                {/* Stats or helpful info */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-700">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Try checking your notes list</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <Link
                  href="/notes"
                  className="flex text-sm hover:text-blue-600 items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Return to My Notes
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8 ">
        <div className="mx-auto">
          <BackButton>Back to notes</BackButton>
          <Card>
            <CardHeader className="border-b p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-bold sm:text-3xl">
                    {note.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Shared on {formatDate(note.createdAt + "")} • Public Note
                  </CardDescription>
                </div>
                {session?.user?.id == String(note.authorId) && (
                  <ReusableModal
                    title="Share document"
                    description="Search for users to share this document with."
                    Trigger={
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 shrink-0"
                        aria-label="Share note"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    }
                  >
                    <UserSearchForm noteId={note.id} />
                  </ReusableModal>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <MarkDownPreviewer content={note.content} />
            </CardContent>
          </Card>
          {session?.user?.id == String(note.authorId) && (
            <div className="mt-4">
              <Suspense
                fallback={
                  <Card>
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-5 w-5" />
                        <Skeleton className="h-5 w-24" />
                        <div className="ml-auto">
                          <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-48 mt-1" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Array.from({ length: 2 }).map((_, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg border bg-card"
                          >
                            <div className="flex items-center gap-3">
                              <Skeleton className="h-8 w-8 rounded-full" />
                              <div className="flex flex-col gap-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-32" />
                              </div>
                            </div>
                            <Skeleton className="h-9 w-16" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                }
              >
                <SharedWithList noteId={note.id} slug={note.shareSlug} />
              </Suspense>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
