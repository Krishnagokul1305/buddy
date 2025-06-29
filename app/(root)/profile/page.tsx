import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DashBoardStats from "@/components/DashBoardStats";
import { Suspense } from "react";
import RecentNotes from "@/components/RecentNotes";
import RecentlyShared from "@/components/RecentlyShared";
import { Skeleton } from "@/components/ui/skeleton";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();
  const userId = session?.user?.id ? Number(session.user.id) : null;
  if (!userId) return null;
  return (
    <main>
      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card
                key={index}
                className="relative overflow-hidden border border-border backdrop-blur-sm bg-accent/50 shadow-sm"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 rounded-lg bg-muted animate-pulse">
                        <div className="h-5 w-5 bg-muted-foreground/20 rounded animate-pulse" />
                      </div>
                      <div>
                        <div className="h-4 w-20 bg-muted-foreground/20 rounded animate-pulse" />
                      </div>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="h-9 w-16 bg-muted-foreground/20 rounded animate-pulse" />
                  </div>
                  <div className="h-3 w-24 bg-muted-foreground/20 rounded animate-pulse" />

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent opacity-50" />
                </CardContent>
              </Card>
            ))}
          </div>
        }
      >
        <DashBoardStats userId={userId} />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-sm ">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-foreground">
                    Recent Notes
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Your latest notes and updates
                  </CardDescription>
                </div>
                <Link href={"/notes"}>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    size="sm"
                  >
                    View All{" "}
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Suspense
                fallback={
                  <>
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div
                        key={index}
                        className="p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Skeleton className="h-5 w-64" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Skeleton className="h-4 w-4" />
                              <Skeleton className="h-3 w-20" />
                            </div>
                          </div>
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </>
                }
              >
                <RecentNotes userId={userId} />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Recently Shared</CardTitle>
              <CardDescription className="text-muted-foreground">
                Notes shared with you by others
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Suspense
                fallback={
                  <>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-3 border border-border rounded-lg"
                      >
                        <div className="flex-1 min-w-0 space-y-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-32" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                      </div>
                    ))}
                    <Skeleton className="h-8 w-full mt-4" />
                  </>
                }
              >
                <RecentlyShared userId={userId} />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
