"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { formatDate, truncateContent } from "@/lib/utils";
import { Note } from "@/types/note";
import { useRouter } from "next/navigation";

function SharedNotesCard({ note }: { note: Note }) {
  const router = useRouter();
  return (
    <Card
      key={note.id}
      className="overflow-hidden cursor-pointer"
      onClick={() => router.push(`/notes/${note.share_slug}`)}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle>{note.title}</CardTitle>
          <Badge variant="default" className="ml-2">
            <Eye className="h-3 w-3 mr-1" />
            Public
          </Badge>
        </div>
        <CardDescription>
          Shared on {formatDate(note.created_at + "")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground whitespace-pre-wrap">
          {truncateContent(note.content, 200)}
        </div>
      </CardContent>
    </Card>
  );
}

export default SharedNotesCard;
