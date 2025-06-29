"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, AlertCircle, Loader2, Eye, Edit } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import type { UserData } from "@/types/user";
import { shareNoteAction } from "@/lib/actions";
import { toast } from "sonner";
import type { Access } from "@/types/note";

interface SharedUser {
  userId: string;
  permission: Access;
}

export function UserSearchForm({ noteId }: { noteId: number }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<UserData[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sharedWith, setSharedWith] = useState<SharedUser[]>([]);
  const [loadingUserId, setLoadingUserId] = useState<string | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<
    Record<string, Access>
  >({});

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

  async function handleShare(note: number, userId: string, permission: Access) {
    try {
      setLoadingUserId(userId);
      await shareNoteAction(note, +userId, permission);
      setSharedWith((prev) => [...prev, { userId, permission }]);
      setSelectedPermissions((prev) => {
        const updated = { ...prev };
        delete updated[userId];
        return updated;
      });
      toast.success(`Note shared with ${permission.toLowerCase()} access`);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoadingUserId(null);
    }
  }

  function handlePermissionChange(userId: string, permission: Access) {
    setSelectedPermissions((prev) => ({
      ...prev,
      [userId]: permission,
    }));
  }

  function getSharedUser(userId: string): SharedUser | undefined {
    return sharedWith.find((shared) => shared.userId === userId);
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
              <li
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-md border gap-3 sm:gap-0"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Skeleton className="h-4 w-full max-w-[120px] mb-2" />
                    <Skeleton className="h-3 w-full max-w-[180px]" />
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end sm:justify-start">
                  <Skeleton className="h-8 w-20 sm:w-24" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </li>
            ))}
          </ul>
        ) : error ? (
          <div className="text-center py-4 text-red-500 flex flex-col items-center">
            <AlertCircle className="mb-2" />
            <p className="text-sm px-4">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 bg-transparent"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : !users || users.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground text-sm px-4">
            {searchQuery
              ? `No users found matching "${searchQuery}"`
              : "Start typing to search for users"}
          </div>
        ) : (
          <ul className="space-y-3">
            {users.map((user) => {
              const sharedUser = getSharedUser(user.id + "");
              const isShared = !!sharedUser;
              const isLoading = loadingUserId === user.id + "";
              const selectedPermission =
                selectedPermissions[user.id + ""] || "VIEW";

              return (
                <li
                  key={user.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-md border gap-3 sm:gap-0"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <Avatar className="size-8 flex-shrink-0">
                      <AvatarFallback>
                        {(user.username || "U")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {user.username || "User"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-end sm:justify-start">
                    {isShared ? (
                      <Badge
                        variant={
                          sharedUser?.permission === "EDIT"
                            ? "default"
                            : "secondary"
                        }
                        className="flex items-center gap-1 text-xs"
                      >
                        {sharedUser?.permission === "EDIT" ? (
                          <Edit className="size-3" />
                        ) : (
                          <Eye className="size-3" />
                        )}
                        {sharedUser?.permission}
                      </Badge>
                    ) : (
                      <div className="flex items-center gap-2 w-full ms-auto sm:w-auto">
                        <Select
                          value={selectedPermission}
                          onValueChange={(value: Access) =>
                            handlePermissionChange(user.id + "", value)
                          }
                          disabled={isLoading}
                        >
                          <SelectTrigger className="w-20 sm:w-24 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="VIEW">
                              <div className="flex items-center gap-2">
                                <Eye className="size-3" />
                                <span className="text-xs">View</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="EDIT">
                              <div className="flex items-center gap-2">
                                <Edit className="size-3" />
                                <span className="text-xs">Edit</span>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          disabled={isLoading}
                          onClick={() =>
                            handleShare(
                              noteId,
                              user.id + "",
                              selectedPermission
                            )
                          }
                          className="text-xs px-3 h-8"
                        >
                          {isLoading ? (
                            <Loader2 className="animate-spin size-4" />
                          ) : (
                            "Share"
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
