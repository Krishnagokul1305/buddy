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
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { notesService } from "@/services/notes.service";
import { Note } from "@/types/note";

export default async function SharedNotePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const note: Note | null = await notesService.getNoteBySlug(slug);
  if (!note)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">No Notes found</CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/notes">Go back to notes</Link>
          </Button>
        </CardContent>
      </Card>
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
                Shared on {formatDate(note.created_at)} • Public Note
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
