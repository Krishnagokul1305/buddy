import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Access, RecentlySharedNote } from "@/types/note";
import { Eye, FileText, UserPlus } from "lucide-react";
import { Badge } from "./ui/badge";
import { notesService } from "@/services/notes.service";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";

async function RecentlyShared({ userId }: { userId: number }) {
  const recentlyShared: RecentlySharedNote[] | null =
    await notesService.getRecentlySharedNotes(userId);

  const getAccessColor = (access: Access) => {
    switch (access) {
      case "VIEW":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "EDIT":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const getAccessIcon = (access: Access) => {
    switch (access) {
      case "VIEW":
        return <Eye className="h-3 w-3" />;
      case "EDIT":
        return <FileText className="h-3 w-3" />;
      default:
        return <Eye className="h-3 w-3" />;
    }
  };

  if (!recentlyShared || recentlyShared.length == 0)
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <UserPlus className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No shared notes
        </h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-sm">
          No one has shared any notes with you yet. Shared notes will appear
          here.
        </p>
      </div>
    );
  return (
    <>
      {recentlyShared.map((item) => (
        <div
          key={item.id}
          className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors duration-200"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {item.title}
              </p>
              <Badge
                variant="secondary"
                className={`${getAccessColor(
                  item.access as Access
                )} text-xs border-0 ml-2`}
              >
                <span className="flex items-center space-x-1">
                  {getAccessIcon(item.access as Access)}
                  <span>{item.access}</span>
                </span>
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              by {item.sharedBy} • {formatDate(item.sharedDate)}
            </p>
            <p className="text-xs text-muted-foreground">
              Shared with {item.sharedWith}
            </p>
          </div>
        </div>
      ))}
      <Link href={"/shared-notes"}>
        <Button
          variant="outline"
          className="w-full bg-transparent mt-4"
          size="sm"
        >
          View All Shared Notes{" "}
        </Button>
      </Link>
    </>
  );
}

export default RecentlyShared;
