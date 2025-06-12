import type React from "react";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ProfileEditForm from "@/components/ProfileEditForm";
import { userService } from "@/services/user.service";

export default async function ProfileEditPage() {
  const data = await userService.getCurrentUserProfile();
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="space-y-6">
        {/* Header */}
        {/* <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Profile</h1>
            <p className="text-muted-foreground">
              Update your personal information and preferences
            </p>
          </div>
        </div> */}
        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
        </div>
      </div>
      <ProfileEditForm defaultvalues={data} />
    </div>
  );
}
