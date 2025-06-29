import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <div className="flex min-h-screen flex-col w-full">
      <main className="flex-1 container rounded-lg">
        <div className="mt-6">
          <Skeleton className="h-80 w-full" />
        </div>
      </main>
    </div>
  );
}

export default Loading;
