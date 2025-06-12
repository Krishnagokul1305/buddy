import { BookOpen, Plus } from "lucide-react";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { notesService } from "@/services/notes.service";
import NotesCard from "@/components/NotesCard";
import { Note } from "@/types/note";

export default async function NotesPage() {
  const notes: Note[] | null = await notesService.getUserNotes();
  if (!notes || notes.length == 0) {
    return (
      <>
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto mb-6 text-muted-foreground/30" />
          <h2 className="text-xl font-medium mb-2">No notes yet</h2>
          <p className="text-muted-foreground mb-6">
            Create your first note to get started
          </p>
          <Link
            href={"/notes/create"}
            className="text-white bg-primary p-3 flex items-center justify-center w-fit rounded-lg mx-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Note
          </Link>
        </div>
      </>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {notes.map((note) => (
        <NotesCard note={note} key={note.id} />
      ))}
    </div>
  );
}

{
  /* <div className="text-center py-12">
          <Share className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
          <h2 className="text-xl font-medium mb-2">No shared notes</h2>
          <p className="text-muted-foreground">
            Shared notes from other users will appear here
          </p>
        </div> */
}
