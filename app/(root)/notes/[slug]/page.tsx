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
import { ArrowLeft, Search, Sparkles } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { notesService } from "@/services/notes.service";
import { Note } from "@/types/note";

export default async function SharedNotePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;
  const note: Note | null = await notesService.getNoteBySlug(slug);
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

  const renderMarkdown = (content: string) => {
    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/notes"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to notes
          </Link>
          <Card className="shadow-lg">
            <CardHeader className="border-b">
              <CardTitle className="text-3xl font-bold">{note.title}</CardTitle>
              <CardDescription className="text-base">
                Shared on {formatDate(note.created_at + "")} • Public Note
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              {renderMarkdown(note.content)}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
