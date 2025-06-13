"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Github,
  Linkedin,
  FileText,
  Camera,
  Save,
  ArrowLeft,
  Code,
  Building,
} from "lucide-react";
import { UserData } from "@/types/user";
import { updateUser } from "@/lib/actions";
import { toast } from "sonner";

function ProfileEditForm({
  defaultvalues,
}: {
  defaultvalues: UserData | null;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UserData>({
    defaultValues: {
      username: defaultvalues?.username,
      email: defaultvalues?.email,
      name: defaultvalues?.name || "",
      phone: defaultvalues?.phone || "",
      college_name: defaultvalues?.college_name || "",
      year_of_study: defaultvalues?.year_of_study || 1,
      degree: defaultvalues?.degree || "",
      branch: defaultvalues?.branch || "",
      github_username: defaultvalues?.github_username || "",
      leetcode_username: defaultvalues?.leetcode_username || "",
      linkedin_username: defaultvalues?.linkedin_username || "",
      resume_link: defaultvalues?.resume_link || "",
      profile_picture: defaultvalues?.profile_picture || "",
      bio: defaultvalues?.bio || "",
    },
  });

  const watchedName = watch("name");
  const watchedBio = watch("bio");
  const watchedProfilePicture = watch("profile_picture");
  const watchedYearOfStudy = watch("year_of_study");

  const onSubmit = async (data: UserData) => {
    try {
      console.log(data);
      await updateUser(data);
      toast("updated successfully");
    } catch (error) {
      toast("something went wrong");
    }
  };

  //   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = e.target.files?.[0];
  //     if (file) {
  //       // Validate file size (2MB limit)
  //       if (file.size > 2 * 1024 * 1024) {
  //         alert("File size must be less than 2MB");
  //         return;
  //       }

  //       // Validate file type
  //       if (!file.type.startsWith("image/")) {
  //         alert("Please select a valid image file");
  //         return;
  //       }

  //       const reader = new FileReader();
  //       reader.onload = (e) => {
  //         setValue("profile_picture", e.target?.result as string, {
  //           shouldDirty: true,
  //         });
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   };

  const yearOptions = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-5">
      {/* Profile Picture & Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Your basic profile information and photo
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          {/* <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={watchedProfilePicture || undefined} />
                  <AvatarFallback className="text-lg">
                    {watchedName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Label htmlFor="profile-picture" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                      <Camera className="h-4 w-4" />
                      <span className="text-sm">Change Photo</span>
                    </div>
                  </Label>
                  <Input
                    id="profile-picture"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Username (Read-only) */}
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

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                {...register("name", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                id="name"
                placeholder="Enter your full name"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("phone", {
                    pattern: {
                      value: /^[+]?[1-9][\d]{0,15}$/,
                      message: "Please enter a valid phone number",
                    },
                  })}
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className={`pl-10 ${errors.phone ? "border-red-500" : ""}`}
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              {...register("bio", {
                maxLength: {
                  value: 500,
                  message: "Bio must be less than 500 characters",
                },
              })}
              id="bio"
              placeholder="Tell us about yourself..."
              className={`min-h-[100px] ${errors.bio ? "border-red-500" : ""}`}
            />
            <div className="flex justify-between items-center">
              <div>
                {errors.bio && (
                  <p className="text-sm text-red-500">{errors.bio.message}</p>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {watchedBio?.length || 0}/500 characters
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Academic Information
          </CardTitle>
          <CardDescription>
            Your educational background and current studies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* College Name */}
            <div className="space-y-2">
              <Label htmlFor="college">College/University</Label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("college_name")}
                  id="college"
                  placeholder="Enter your college name"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Year of Study */}
            <div className="space-y-2">
              <Label htmlFor="year">Year of Study</Label>
              <Select
                value={watchedYearOfStudy?.toString() || ""}
                onValueChange={(value) =>
                  setValue("year_of_study", Number.parseInt(value), {
                    shouldDirty: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      Year {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Degree */}
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input
                {...register("degree")}
                id="degree"
                placeholder="e.g., Bachelor of Technology"
              />
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <Label htmlFor="branch">Branch/Major</Label>
              <Input
                {...register("branch")}
                id="branch"
                placeholder="e.g., Computer Science Engineering"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Social Links
          </CardTitle>
          <CardDescription>
            Connect your social and professional profiles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* GitHub */}
            <div className="space-y-2">
              <Label htmlFor="github">GitHub Username</Label>
              <div className="relative">
                <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("github_username", {
                    pattern: {
                      value: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
                      message: "Please enter a valid GitHub username",
                    },
                  })}
                  id="github"
                  placeholder="your-github-username"
                  className={`pl-10 ${
                    errors.github_username ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.github_username && (
                <p className="text-sm text-red-500">
                  {errors.github_username.message}
                </p>
              )}
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn Username</Label>
              <div className="relative">
                <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("linkedin_username")}
                  id="linkedin"
                  placeholder="your-linkedin-username"
                  className="pl-10"
                />
              </div>
            </div>

            {/* LeetCode */}
            <div className="space-y-2">
              <Label htmlFor="leetcode">LeetCode Username</Label>
              <div className="relative">
                <Code className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("leetcode_username")}
                  id="leetcode"
                  placeholder="your-leetcode-username"
                  className="pl-10"
                />
              </div>
            </div>

            {/* Resume Link */}
            <div className="space-y-2">
              <Label htmlFor="resume">Resume Link</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  {...register("resume_link", {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Please enter a valid URL",
                    },
                  })}
                  id="resume"
                  type="url"
                  placeholder="https://drive.google.com/file/d/..."
                  className={`pl-10 ${
                    errors.resume_link ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.resume_link && (
                <p className="text-sm text-red-500">
                  {errors.resume_link.message}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isDirty && (
        <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
          You have unsaved changes. Don't forget to save your updates!
        </div>
      )}

      <div className="flex items-center gap-3 justify-end">
        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="flex-1 sm:flex-none"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
        <Button type="button" variant="outline" className="flex-1 sm:flex-none">
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default ProfileEditForm;
