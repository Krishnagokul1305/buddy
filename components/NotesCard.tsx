"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Edit, Eye, Lock, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { formatDate, truncateContent } from "@/lib/utils";
import { Note, NoteWithAccess } from "@/types/note";
import { useRouter } from "next/navigation";
import ReusableDeleteModal from "./ReusableDeleteModal";
import { deleteNoteAction } from "@/lib/actions";
import { SimpleContentRenderer } from "./simple-content-renderer";

function NotesCard({
  note,
  userId,
}: {
  note: Note | NoteWithAccess;
  userId: number;
}) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/notes/edit/${note.id}`);
  };

  return (
    <Card className="overflow-hidden hover:cursor-pointer flex flex-col h-full group hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader
        className="pb-3"
        onClick={() => router.push(`/notes/${note.shareSlug}`)}
      >
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{note.title}</CardTitle>
          <Badge
            variant={note.isPublic ? "default" : "outline"}
            className="ml-2"
          >
            {note.isPublic ? (
              <Eye className="h-3 w-3 mr-1" />
            ) : (
              <Lock className="h-3 w-3 mr-1" />
            )}
            {note.isPublic ? "Public" : "Private"}
          </Badge>
        </div>
        <CardDescription>
          Created on {formatDate(note.createdAt + "")}
        </CardDescription>
      </CardHeader>
      <CardContent
        className="pb-3 flex-grow"
        onClick={() => router.push(`/notes/${note.shareSlug}`)}
      >
        <div className="text-muted-foreground">
          <SimpleContentRenderer content={note.content} maxLength={100} />
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between transition-opacity">
        {(userId === +note.authorId ||
          (note as NoteWithAccess)?.access === "EDIT") && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>

            {userId === +note.authorId && (
              <ReusableDeleteModal
                onDelete={async () => await deleteNoteAction(note.id)}
                trigger={
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                }
              />
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default NotesCard;
