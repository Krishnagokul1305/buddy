import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Plus, Share } from "lucide-react";

import NotesCard from "@/components/NotesCard";
import SharedNotesCard from "@/components/SharedNotesCard";
import Link from "next/link";
import prisma from "../../lib/prisma";
import { auth } from "@/lib/auth";

// Dummy data types
interface Note {
  id: number;
  title: string;
  content: string;
  is_public: boolean;
  created_at: string;
}

export default async function NotesPage() {
  // if (loading) {
  //   return (
  //     <div className="flex min-h-screen flex-col">
  //       <main className="flex-1 container py-8">
  //         <div className="flex flex-col gap-8">
  //           <div className="flex justify-between items-center">
  //             <h1 className="text-3xl font-bold">My Notes</h1>
  //             <Skeleton className="h-10 w-32" />
  //           </div>

  //           <Tabs defaultValue="my-notes" className="w-full">
  //             <TabsList className="grid w-full grid-cols-2">
  //               <Skeleton className="h-10 w-full" />
  //               <Skeleton className="h-10 w-full" />
  //             </TabsList>

  //             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //               {[1, 2, 3].map((i) => (
  //                 <Skeleton key={i} className="h-64 w-full" />
  //               ))}
  //             </div>
  //           </Tabs>
  //         </div>
  //       </main>
  //     </div>
  //   );
  // }

  const notes: Note[] = [];
  const sharedNotes: Note[] = [];

  console.log(await auth());

  return (
    <div className="min-h-screen">
      <main className="flex-1 container py-8 max-w-7xl mx-auto">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">My Notes</h1>
          </div>

          <Tabs defaultValue="my-notes" className="w-full">
            <TabsList className="h-auto p-0 bg-transparent justify-start border-b rounded-none w-auto">
              <TabsTrigger
                value="my-notes"
                className="rounded-none gap-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                <BookOpen className="h-4 w-4" />
                My Notes
              </TabsTrigger>
              <TabsTrigger
                value="shared-notes"
                className="rounded-none gap-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                <Share className="h-4 w-4" />
                Shared Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="my-notes" className="pt-6">
              {notes.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 mx-auto mb-6 text-muted-foreground/30" />
                  <h2 className="text-xl font-medium mb-2">No notes yet</h2>
                  <p className="text-muted-foreground mb-6">
                    Create your first note to get started
                  </p>
                  <Link
                    href={"/notes/create"}
                    className="text-white bg-primary p-3 flex items-center justify-center w-fit rounded-lg mx-auto"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create Note
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {notes.map((note, index) => (
                    <NotesCard note={note} key={index} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="shared-notes" className="pt-6">
              {sharedNotes.length === 0 ? (
                <div className="text-center py-12">
                  <Share className="h-12 w-12 mx-auto mb-4 text-muted-foreground/30" />
                  <h2 className="text-xl font-medium mb-2">No shared notes</h2>
                  <p className="text-muted-foreground">
                    Shared notes from other users will appear here
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sharedNotes.map((note) => (
                    <SharedNotesCard note={note} key={note.id} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
