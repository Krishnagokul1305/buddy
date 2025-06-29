import { Calendar, Eye, FileText, Inbox, Lock } from "lucide-react";
import { Badge } from "./ui/badge";
import { notesService } from "@/services/notes.service";
import { Note } from "@/types/note";
import { formatDate } from "@/lib/utils";

async function RecentNotes({ userId }: { userId: number }) {
  const recentNotes: Note[] | null = await notesService.getRecentNotes(userId);
  const getTypeColor = (type: string) => {
    switch (type) {
      case "private":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-200";
      case "public":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "private":
        return <Lock className="h-3 w-3" />;
      case "public":
        return <Eye className="h-3 w-3" />;
      default:
        return <FileText className="h-3 w-3" />;
    }
  };
  if (!recentNotes || recentNotes.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Inbox className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No recent notes
        </h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-sm">
          You haven't created any notes yet. Start by creating your first note
          to see it here.
        </p>
      </div>
    );
  }
  return (
    <>
      {recentNotes.map((note) => (
        <div
          key={note.id}
          className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="font-semibold text-foreground line-clamp-1">
                  {note.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-xs">
                  {formatDate(note.createdAt + "")}
                </span>
              </div>
            </div>
            <Badge
              variant="secondary"
              className={`${getTypeColor(
                note.isPublic ? "public" : "private"
              )} text-xs border-0`}
            >
              <span className="flex items-center space-x-1">
                {getTypeIcon(note.isPublic ? "public" : "private")}
                <span className="capitalize">
                  {note.isPublic ? "public" : "private"}
                </span>
              </span>
            </Badge>
          </div>
        </div>
      ))}
    </>
  );
}

export default RecentNotes;
