"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { changePasswordAction } from "@/lib/actions";
import { toast } from "sonner";
import { EditUserForm, UserProfile } from "@/types/user";
import { Badge } from "./ui/badge";

type PasswordFormInputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function PersonalDetailsForm({ profile }: { profile: UserProfile | null }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditUserForm>({
    defaultValues: {
      username: profile?.username || "",
      email: profile?.email || "",
    },
  });

  const [showPasswords, setShowPasswords] = useState(false);

  const onSubmit = async (data: EditUserForm) => {
    try {
      await changePasswordAction(data.currentPassword, data.newPassword);
      toast("Profile updated successfully");
    } catch (error) {
      toast("something went wrong");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personel Details</CardTitle>
        <CardDescription>
          Update your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <Input
                  {...register("username")}
                  id="username"
                  disabled
                  className="bg-muted"
                />
                <Badge
                  variant="secondary"
                  className="absolute right-2 top-2 text-xs"
                >
                  Read-only
                </Badge>
              </div>
            </div>

            {/* Email (Read-only) */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  disabled
                  className="pl-10 bg-muted"
                />
                <Badge
                  variant="secondary"
                  className="absolute right-2 top-2 text-xs"
                >
                  Read-only
                </Badge>
              </div>
            </div>
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showPasswords ? "text" : "password"}
                  {...register("currentPassword", {
                    required: "Current password is required",
                  })}
                  placeholder="Enter your current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPasswords(!showPasswords)}
                >
                  {showPasswords ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.currentPassword && (
                <p className="text-sm text-red-500">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                placeholder="Enter a new password"
                type={showPasswords ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required",
                })}
              />
              {errors.newPassword && (
                <p className="text-sm text-red-500">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                placeholder="Confirm your new password"
                type={showPasswords ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="block ms-auto"
            disabled={isSubmitting}
          >
            Change Password
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default PersonalDetailsForm;
