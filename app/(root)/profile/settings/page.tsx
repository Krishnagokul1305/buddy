import type React from "react";
import { userService } from "@/services/user.service";
import PersonalDetailsForm from "@/components/PersonalDetailsForm";
import AccountDeleteCard from "@/components/AccountDeleteCard";

export default async function ProfilePage() {
  const profile = await userService.getCurrentUserProfile();
  return (
    <div className="flex flex-col gap-8">
      <PersonalDetailsForm profile={profile} />
      <AccountDeleteCard />
    </div>
  );
}
