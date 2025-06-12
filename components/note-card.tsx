"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Lock, Edit, Trash2 } from "lucide-react";
import { format } from "date-fns";

type NoteCardProps = {
  note: {
    id: number;
    title: string;
    content: string;
    is_public: boolean;
    share_slug?: string;
    created_at: string;
  };
  onEdit: (note: any) => void;
  onDelete: (id: number) => void;
};

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  const truncateContent = (content: string, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full group">
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
          Created on {formatDate(note.created_at)}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-3 flex-grow">
        <div className="text-muted-foreground">
          {truncateContent(note.content)}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="outline" size="sm" onClick={() => onEdit(note)}>
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-destructive"
          onClick={() => onDelete(note.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
