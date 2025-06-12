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
import { Note } from "@/types/note";
import { useRouter } from "next/navigation";
import ReusableDeleteModal from "./ReusableDeleteModal";
import { deleteNoteAction } from "@/lib/actions";

function NotesCard({ note }: { note: Note }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/notes/edit/${note.id}`);
  };

  return (
    <Card className="overflow-hidden hover:cursor-pointer flex flex-col h-full group hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{note.title}</CardTitle>
          <Badge
            variant={note.is_public ? "default" : "outline"}
            className="ml-2"
          >
            {note.is_public ? (
              <Eye className="h-3 w-3 mr-1" />
            ) : (
              <Lock className="h-3 w-3 mr-1" />
            )}
            {note.is_public ? "Public" : "Private"}
          </Badge>
        </div>
        <CardDescription>
          Created on {formatDate(note.created_at + "")}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <div className="text-muted-foreground">
          {truncateContent(note.content)}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between transition-opacity">
        <Button variant="outline" size="sm" onClick={handleClick}>
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <ReusableDeleteModal
          onDelete={async () => await deleteNoteAction(note.id)}
          trigger={
            <Button variant="destructive" size="sm">
              <Trash className="h-4 w-4 mr-1" />
              Delete
            </Button>
          }
        />
      </CardFooter>
    </Card>
  );
}

export default NotesCard;
