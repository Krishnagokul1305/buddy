import { Skeleton } from "@/components/ui/skeleton";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function loading() {
  return (
    <div className="container py-8">
      <CardHeader>
        <CardDescription>
          <Skeleton className="h-4 w-64" />
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Title field skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-12" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>

        {/* Content field skeleton */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" /> {/* Content label */}
            <Skeleton className="h-3 w-32" /> {/* Markdown supported text */}
          </div>

          {/* Tabs skeleton */}
          <div className="w-full">
            <div className="h-auto p-0 bg-transparent justify-start border-b rounded-none w-auto flex">
              <div className="rounded-none  bg-transparent px-4 py-2 flex items-center">
                <Skeleton className="h-4 w-4 mr-2" /> {/* Write icon */}
                <Skeleton className="h-4 w-10" /> {/* Write text */}
              </div>
              <div className="rounded-none  bg-transparent px-4 py-2 flex items-center">
                <Skeleton className="h-4 w-4 mr-2" /> {/* Preview icon */}
                <Skeleton className="h-4 w-12" /> {/* Preview text */}
              </div>
            </div>

            {/* Content area skeleton */}
            <div className="mt-0">
              <Skeleton className="h-[360px] w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Public switch skeleton */}
        <div className="flex items-center space-x-2">
          <Skeleton className="h-6 w-11 rounded-full" /> {/* Switch */}
          <Skeleton className="h-4 w-36" /> {/* Label */}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Skeleton className="h-10 w-16" /> {/* Cancel button */}
        <Skeleton className="h-10 w-24" /> {/* Save button */}
      </CardFooter>
    </div>
  );
}
