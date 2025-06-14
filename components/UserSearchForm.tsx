"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { UserData } from "@/types/user";
import { shareNoteAction } from "@/lib/actions";
import { toast } from "sonner";

export function UserSearchForm({ noteId }: { noteId: number }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<UserData[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sharedWith, setSharedWith] = useState<string[]>([]);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        if (searchQuery.length === 0) {
          setUsers([]);
          return;
        }

        const res = await fetch(`/api/users/search?query=${searchQuery}`, {
          signal,
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setError("Failed to load users. Please try again.");
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    return () => controller.abort();
  }, [searchQuery]);

  async function handleShare(note: number, userId: string) {
    try {
      setLoadingUserId(userId);
      await shareNoteAction(note, +userId);
      setSharedWith((prev) => [...prev, userId]);
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setLoadingUserId(null);
    }
  }

  return (
    <div className="relative w-full">
      <div className="flex items-center border rounded-md px-3 my-4">
        <Search className="size-4 text-muted-foreground mr-2 flex-shrink-0" />
        <Input
          placeholder="Search users by name or email..."
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="max-h-[300px] overflow-y-auto">
        {loading ? (
          <ul className="space-y-3">
            {[...Array(5)].map((_, index) => (
              <li key={index} className="flex items-center justify-between p-2">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-[120px] mb-2" />
                    <Skeleton className="h-3 w-[180px]" />
                  </div>
                </div>
                <Skeleton className="h-8 w-16" />
              </li>
            ))}
          </ul>
        ) : error ? (
          <div className="text-center py-4 text-red-500 flex flex-col items-center">
            <AlertCircle className="mb-2" />
            <p>{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : !users || users.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No users found matching "{searchQuery}"
          </div>
        ) : (
          <ul className="space-y-3">
            {users.map((user) => {
              const isShared = sharedWith.includes(user.id + "");
              const isLoading = loadingUserId === user.id + "";

              return (
                <li
                  key={user.id}
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarImage
                        src={user.profile_picture || "/placeholder.svg"}
                        alt={user.name || "user profile"}
                      />
                      <AvatarFallback>
                        {(user.name || "U")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {user.name || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="ml-2"
                    disabled={isShared || isLoading}
                    onClick={() => handleShare(noteId, user.id + "")}
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin size-4" />
                    ) : isShared ? (
                      "Shared"
                    ) : (
                      "Share"
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
