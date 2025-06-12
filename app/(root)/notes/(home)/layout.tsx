import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import TabsWithLinks from "@/components/TabsWithLinks";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="flex-1 container py-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div className="flex gap-3  justify-between md:items-center">
            <h1 className="text-3xl font-bold">My Notes</h1>
            <Link href="/notes/create" className="">
              <Button
                variant="default"
                className="flex items-center text-white gap-2 w-full sm:w-auto hover:bg-primary transition-colors"
              >
                <PlusCircle className="h-4 w-4 " />
                <span>Create</span>
              </Button>
            </Link>
          </div>
          <TabsWithLinks />
          {children}
        </div>
      </main>
    </div>
  );
}

export default layout;
