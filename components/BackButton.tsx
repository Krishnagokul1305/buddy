"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function BackButton({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      onClick={() => router.back()}
    >
      <ArrowLeft className="mr-1 h-4 w-4" />
      {children}
    </div>
  );
}

export default BackButton;
