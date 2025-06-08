"use client";

import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOutAction } from "@/lib/actions";

function SignOutButton() {
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => signOutAction()}
      className="rounded-full w-9 h-9 border-primary/20 bg-background hover:bg-muted transition-colors"
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );
}

export default SignOutButton;
