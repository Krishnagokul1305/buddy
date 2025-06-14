import { Users } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { UserData } from "@/types/user";
import { notesService } from "@/services/notes.service";
import RemoveShareButton from "./RemoveShareButton";

async function SharedWithList({
  noteId,
  slug,
}: {
  noteId: number;
  slug: string;
}) {
  const sharedUsers: UserData[] | null = await notesService.getSharedUsers(
    noteId
  );

  const isEmpty = !sharedUsers || sharedUsers.length === 0;

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">Shared with</CardTitle>
          {sharedUsers && (
            <Badge variant="secondary" className="ml-auto">
              {sharedUsers.length}{" "}
              {sharedUsers.length === 1 ? "person" : "people"}
            </Badge>
          )}
        </div>
        <CardDescription>People who have access to this note</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sharedUsers?.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user.profile_picture || "/placeholder.svg"}
                    alt={user.name || "profile picture"}
                  />
                  <AvatarFallback className="text-xs">
                    {(user.name || "U")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {user.name || "User"}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user.email || "example2@gmail.com"}
                  </span>
                </div>
              </div>
              <RemoveShareButton
                noteId={noteId}
                userId={user.id || -1}
                slug={slug}
              />
            </div>
          ))}

          {isEmpty && (
            <div className="space-y-2 mb-6">
              <h3 className="text-lg font-medium">No one has access yet</h3>
              <p className="text-sm text-muted-foreground max-w-lg">
                This note is private. Share it with others to collaborate and
                let them view or edit the content.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default SharedWithList;
