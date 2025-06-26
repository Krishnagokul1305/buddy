import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Share2 } from "lucide-react";
import { userService } from "@/services/user.service";
import PersonalDetailsForm from "@/components/PersonalDetailsForm";
import AccountDeleteCard from "@/components/AccountDeleteCard";

export default async function ProfilePage() {
  const profile = await userService.getCurrentUserProfile();
  return (
    <div className="flex min-h-screen flex-col w-full">
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-row px-2 items-start sm:items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback>
                {profile?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <h1 className="text-2xl font-bold">{profile?.username}</h1>
              <p className="text-muted-foreground">{profile?.email}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <Link href="/profile/edit" className="w-full sm:w-auto"></Link>
              <Button size="icon" className="hidden sm:flex">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <PersonalDetailsForm profile={profile} />
          <AccountDeleteCard />
        </div>
      </main>
    </div>
  );
}
