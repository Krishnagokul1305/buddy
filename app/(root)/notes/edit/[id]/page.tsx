import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import NotesForm from "@/components/NotesForm";
import { notesService } from "@/services/notes.service";
import { Note } from "@/types/note";

export default async function EditNotePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const note: Note | null = await notesService.getNoteById(+id);

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href="/notes"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold">Edit Note</h1>
            </div>
          </div>

          <Card className="shadow-lg">
            <NotesForm note={note} isEdit={true} />
          </Card>
        </div>
      </main>
    </div>
  );
}
