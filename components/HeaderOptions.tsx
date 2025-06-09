"use client";

import Link from "next/link";
import { ThemeToggleEnhanced } from "./theme-toggle-enhanced";
import { User } from "lucide-react";
import SignOutButton from "./SignOutButton";
import { useSession } from "next-auth/react";

function HeaderOptions() {
  const { data: session } = useSession();
  return (
    <div className="flex items-center gap-4">
      <ThemeToggleEnhanced />
      {session?.user && (
        <>
          <Link
            href="/profile"
            className="flex items-center justify-center border rounded-full w-9 h-9 border-primary/20 bg-background hover:bg-muted transition-colors"
          >
            <User className="w-5 h-5" />
          </Link>
          <SignOutButton />
        </>
      )}
    </div>
  );
}

export default HeaderOptions;
