import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex min-h-screen flex-col max-w-screen-xl mx-auto">
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="grid w-full grid-cols-4 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>

          <div className="mt-6">
            <Skeleton className="h-64 w-full" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Loading;
