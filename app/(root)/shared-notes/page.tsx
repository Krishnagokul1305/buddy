import NotesCard from "@/components/NotesCard";
import { auth } from "@/lib/auth";
import { notesService } from "@/services/notes.service";
import { Note } from "@/types/note";
import { Share } from "lucide-react";

async function page() {
  const session = await auth();
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId) return null;
  const notes: Note[] | null = await notesService.getNotesSharedToUser(userId);
  if (!notes || notes.length == 0) {
    return (
      <div className="text-center py-12">
        <Share className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
        <h2 className="text-xl font-medium mb-2">No shared notes</h2>
        <p className="text-muted-foreground">
          Shared notes from other users will appear here
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {notes.map((note) => (
        <NotesCard key={note.id} note={note} userId={userId} />
      ))}
    </div>
  );
}

export default page;
