import type React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

import NotesForm from "@/components/NotesForm";

export default function CreateNotePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link
                href="/notes"
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <h1 className="text-3xl font-bold">Create New Note</h1>
            </div>
          </div>

          <Card className="animate-scale-in">
            <NotesForm />
          </Card>
        </div>
      </main>
    </div>
  );
}
