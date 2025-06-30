import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <main className="flex-1">
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    </main>
  );
}

export default loading;
