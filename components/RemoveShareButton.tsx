"use client";

import { useState } from "react";
import { removeSharedUserAction } from "@/lib/actions";
import { Button } from "./ui/button";
import { toast } from "sonner";

function RemoveShareButton({
  noteId,
  userId,
  slug,
}: {
  noteId: number;
  userId: number;
  slug: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      if (noteId != -1) await removeSharedUserAction(noteId, userId, slug);
    } catch (error) {
      toast("Something went wrong");
    } finally {
      setLoading(false);
      toast("User removed successfully");
    }
  };

  return (
    <Button size="sm" onClick={handleClick} disabled={loading}>
      {loading ? "Removing..." : "Remove"}
    </Button>
  );
}

export default RemoveShareButton;
