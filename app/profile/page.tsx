"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  User,
  GraduationCap,
  Github,
  Linkedin,
  BarChart,
  Edit,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/components/auth-provider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { ThemeToggleEnhanced } from "@/components/theme-toggle-enhanced";
import { userService } from "@/services/user.service";
import type { UserProfile, EditUserForm } from "@/types/user";

export default function ProfilePage() {
  const { theme } = useTheme();
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editForm, setEditForm] = useState<EditUserForm>({
    phone: "",
    bio: "",
    github_username: "",
    leetcode_username: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Simulate loading time
        await new Promise((resolve) => setTimeout(resolve, 1200));

        const dummyProfile: UserProfile = {
          id: 1,
          username: "alex_dev2024",
          name: { String: "Alexandra Johnson", Valid: true },
          email: "alexandra.johnson@university.edu",
          phone: { String: "+1 (555) 123-4567", Valid: true },
          college_name: { String: "Stanford University", Valid: true },
          year_of_study: { Int32: 3, Valid: true },
          degree: { String: "Bachelor of Science", Valid: true },
          branch: { String: "Computer Science & Engineering", Valid: true },
          github_username: { String: "alexandra-dev", Valid: true },
          leetcode_username: { String: "alex_codes", Valid: true },
          linkedin_username: { String: "alexandra-johnson-dev", Valid: true },
          resume_link: {
            String: "https://drive.google.com/file/d/1234567890/view",
            Valid: true,
          },
          profile_picture: {
            String:
              "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
            Valid: true,
          },
          bio: {
            String:
              "Passionate full-stack developer with expertise in React, Node.js, and Python. Currently pursuing CS degree at Stanford with a focus on AI/ML. Love solving complex problems and building innovative solutions. Active contributor to open-source projects and competitive programming enthusiast.\n\nInterested in software engineering internships for Summer 2024.",
            Valid: true,
          },
          is_verified: true,
        };

        setProfile(dummyProfile);
        setEditForm({
          phone: dummyProfile.phone.String,
          bio: dummyProfile.bio.String,
          github_username: dummyProfile.github_username.String,
          leetcode_username: dummyProfile.leetcode_username.String,
        });
      } catch (error) {
        console.error("Error loading dummy profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, user, router]);

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile || !token || !user) return;

    try {
      const updatedProfile = await userService.updateUserProfile(
        user.id,
        {
          phone: { String: editForm.phone, Valid: true },
          bio: { String: editForm.bio, Valid: true },
          github_username: { String: editForm.github_username, Valid: true },
          leetcode_username: {
            String: editForm.leetcode_username,
            Valid: true,
          },
        },
        token
      );

      if (updatedProfile) {
        setProfile(updatedProfile);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const getGithubTheme = () => {
    return theme === "dark" ? "dark" : "default";
  };

  const getLeetcodeTheme = () => {
    return theme === "dark" ? "dark" : "light";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col max-w-screen-xl mx-auto">
        <main className="flex-1 container py-8">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </TabsList>

              <div className="mt-6">
                <Skeleton className="h-64 w-full" />
              </div>
            </Tabs>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col max-w-screen-xl mx-auto">
      <main className="flex-1 container py-8">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={profile?.profile_picture?.String || "/placeholder.svg"}
                alt={profile?.name?.String || profile?.username}
              />
              <AvatarFallback>
                {profile?.name?.String
                  ? getInitials(profile.name.String)
                  : profile?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">
                {profile?.name?.String || profile?.username}
              </h1>
              <p className="text-muted-foreground">{profile?.email}</p>
              {/* {profile?.is_verified && (
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500 border-green-500/20"
                >
                  Verified
                </Badge>
              )} */}
            </div>

            <div className="sm:ml-auto">
              <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 btn-hover-effect animate-fade-in"
                  >
                    <Edit className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="animate-scale-in">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile information.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div className="space-y-2 animate-slide-up stagger-1">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleEditChange}
                        placeholder="1234567890"
                        className="form-field-animation"
                      />
                    </div>
                    <div className="space-y-2 animate-slide-up stagger-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={editForm.bio}
                        onChange={handleEditChange}
                        placeholder="Tell us about yourself"
                        rows={4}
                        className="form-field-animation"
                      />
                    </div>
                    <div className="space-y-2 animate-slide-up stagger-3">
                      <Label
                        htmlFor="github_username"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        GitHub Username
                      </Label>
                      <Input
                        id="github_username"
                        name="github_username"
                        value={editForm.github_username || ""}
                        onChange={handleEditChange}
                        placeholder="johndoe"
                        className="form-field-animation"
                      />
                    </div>
                    <div className="space-y-2 animate-slide-up stagger-4">
                      <Label
                        htmlFor="leetcode_username"
                        className="flex items-center gap-2"
                      >
                        <svg
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
                        </svg>
                        LeetCode Username
                      </Label>
                      <Input
                        id="leetcode_username"
                        name="leetcode_username"
                        value={editForm.leetcode_username || ""}
                        onChange={handleEditChange}
                        placeholder="johndoe"
                        className="form-field-animation"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="btn-hover-effect animate-fade-in"
                      >
                        Save changes
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs defaultValue="personal">
            <TabsList className="h-auto p-0 bg-transparent justify-start border-b rounded-none w-auto">
              <TabsTrigger
                value="personal"
                className="rounded-none gap-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                <User className="h-4 w-4" />
                <span>Personal Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="academic"
                className="rounded-none gap-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                <GraduationCap className="h-4 w-4" />
                <span>Academic Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className="rounded-none gap-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                <Github className="h-4 w-4" />
                <span>Social Stats</span>
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="rounded-none gap-2 border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent bg-transparent px-4 py-2 data-[state=active]:shadow-none"
              >
                <BarChart className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="personal"
              className="space-y-4 pt-6 tab-transition"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Username
                      </h3>
                      <p className="text-base">{profile?.username}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Full Name
                      </h3>
                      <p className="text-base">
                        {profile?.name?.String || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Email
                      </h3>
                      <p className="text-base">{profile?.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Phone
                      </h3>
                      <p className="text-base">
                        {profile?.phone?.String || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Bio
                    </h3>
                    <p className="text-base whitespace-pre-line">
                      {profile?.bio?.String || "No bio provided"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="academic"
              className="space-y-4 pt-6 tab-transition"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                  <CardDescription>
                    Your educational background and qualifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        College Name
                      </h3>
                      <p className="text-base">
                        {profile?.college_name?.String || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Year of Study
                      </h3>
                      <p className="text-base">
                        {profile?.year_of_study?.Valid
                          ? `${profile.year_of_study.Int32}${getOrdinalSuffix(
                              profile.year_of_study.Int32
                            )} Year`
                          : "Not provided"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Degree
                      </h3>
                      <p className="text-base">
                        {profile?.degree?.String || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">
                        Branch
                      </h3>
                      <p className="text-base">
                        {profile?.branch?.String || "Not provided"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="social"
              className="space-y-4 pt-6 tab-transition animate-fade-in"
            >
              <Card className="overflow-hidden card-hover animate-scale-in">
                <CardHeader>
                  <CardTitle>GitHub Stats</CardTitle>
                  <CardDescription>
                    Your GitHub activity and contributions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profile?.github_username?.String ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="overflow-hidden rounded-lg border animate-slide-up stagger-1">
                        <img
                          src={`https://github-readme-stats.vercel.app/api?username=${
                            profile.github_username.String
                          }&theme=${getGithubTheme()}&show_icons=true&hide_border=true&count_private=true`}
                          alt="GitHub Stats"
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                      <div className="overflow-hidden rounded-lg border animate-slide-up stagger-2">
                        <img
                          src={`https://github-readme-streak-stats.herokuapp.com/?user=${
                            profile.github_username.String
                          }&theme=${getGithubTheme()}&hide_border=true`}
                          alt="GitHub Streak"
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                      <div className="overflow-hidden rounded-lg border lg:col-span-2 animate-slide-up stagger-3">
                        <img
                          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${
                            profile.github_username.String
                          }&theme=${getGithubTheme()}&show_icons=true&hide_border=true&layout=compact`}
                          alt="Top Languages"
                          className="w-full h-auto"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground animate-fade-in">
                      <Github className="h-16 w-16 mx-auto mb-6 opacity-20 animate-float" />
                      <p className="text-lg font-medium">
                        No GitHub username provided
                      </p>
                      <p className="text-sm mt-2">
                        Add your GitHub username in your profile to see your
                        stats
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 animate-fade-in btn-hover-effect"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Add GitHub Username
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="overflow-hidden card-hover animate-scale-in">
                <CardHeader>
                  <CardTitle>LeetCode Stats</CardTitle>
                  <CardDescription>
                    Your LeetCode activity and problem-solving stats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {profile?.leetcode_username?.String ? (
                    <div className="overflow-hidden rounded-lg border animate-slide-up">
                      <img
                        src={`https://leetcard.jacoblin.cool/${
                          profile.leetcode_username.String
                        }?theme=${getLeetcodeTheme()}&font=Poppins&ext=heatmap`}
                        alt="LeetCode Stats"
                        className="w-full h-auto"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground animate-fade-in">
                      <svg
                        className="h-16 w-16 mx-auto mb-6 opacity-20 animate-float"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.824-.662l-4.332-4.363c-.467-.467-.702-1.15-.702-1.863s.235-1.357.702-1.824l4.319-4.38c.467-.467 1.125-.645 1.837-.645s1.357.195 1.823.662l2.697 2.606c.514.515 1.365.497 1.9-.038.535-.536.553-1.387.039-1.901l-2.609-2.636a5.055 5.055 0 0 0-2.445-1.337l2.467-2.503c.516-.514.498-1.366-.037-1.901-.535-.535-1.387-.552-1.902-.038l-10.1 10.101c-.981.982-1.494 2.337-1.494 3.835 0 1.498.513 2.895 1.494 3.875l4.347 4.361c.981.979 2.337 1.452 3.834 1.452s2.853-.512 3.835-1.494l2.609-2.637c.514-.514.496-1.365-.039-1.9s-1.386-.553-1.899-.039zM20.811 13.01H10.666c-.702 0-1.27.604-1.27 1.346s.568 1.346 1.27 1.346h10.145c.701 0 1.27-.604 1.27-1.346s-.569-1.346-1.27-1.346z" />
                      </svg>
                      <p className="text-lg font-medium">
                        No LeetCode username provided
                      </p>
                      <p className="text-sm mt-2">
                        Add your LeetCode username in your profile to see your
                        stats
                      </p>
                      <Button
                        variant="outline"
                        className="mt-4 animate-fade-in btn-hover-effect"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Add LeetCode Username
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="overflow-hidden card-hover animate-scale-in">
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>
                    Your professional and social media profiles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile?.github_username?.String && (
                      <Link
                        href={`https://github.com/${profile.github_username.String}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted transition-colors animate-slide-up stagger-1"
                      >
                        <Github className="h-5 w-5" />
                        <span>GitHub Profile</span>
                      </Link>
                    )}

                    {profile?.linkedin_username?.String && (
                      <Link
                        href={`https://linkedin.com/in/${profile.linkedin_username.String}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted transition-colors animate-slide-up stagger-2"
                      >
                        <Linkedin className="h-5 w-5" />
                        <span>LinkedIn Profile</span>
                      </Link>
                    )}

                    {profile?.resume_link?.String && (
                      <Link
                        href={profile.resume_link.String}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted transition-colors animate-slide-up stagger-3"
                      >
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" y1="13" x2="8" y2="13" />
                          <line x1="16" y1="17" x2="8" y2="17" />
                          <polyline points="10 9 9 9 8 9" />
                        </svg>
                        <span>Resume</span>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent
              value="analytics"
              className="space-y-4 pt-6 tab-transition"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Activity Analytics</CardTitle>
                  <CardDescription>
                    Visualize your activity and progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Notes Created This Month
                      </h3>
                      <div className="h-64 w-full bg-muted/30 rounded-lg flex items-center justify-center">
                        <div className="space-y-4 text-center">
                          <div className="text-4xl font-bold text-primary">
                            24
                          </div>
                          <div>
                            <p className="text-lg font-medium">Notes Created</p>
                            <p className="text-sm text-muted-foreground">
                              +8 from last month
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Study Streak</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-green-500">
                              12
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Current Streak
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-500">
                              45
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Longest Streak
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-purple-500">
                              156
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Total Study Days
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Profile Completion
                      </h3>
                      <div className="w-full bg-muted/30 rounded-full h-4">
                        <div
                          className="bg-primary h-4 rounded-full transition-all duration-500"
                          style={{
                            width: `${calculateProfileCompletion(profile)}%`,
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Your profile is {calculateProfileCompletion(profile)}%
                        complete
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function getOrdinalSuffix(num: number): string {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}

function calculateProfileCompletion(profile: any): number {
  if (!profile) return 0;

  const fields = [
    profile.username,
    profile.name?.String,
    profile.email,
    profile.phone?.String,
    profile.college_name?.String,
    profile.year_of_study?.Valid,
    profile.degree?.String,
    profile.branch?.String,
    profile.github_username?.String,
    profile.leetcode_username?.String,
    profile.linkedin_username?.String,
    profile.resume_link?.String,
    profile.profile_picture?.String,
    profile.bio?.String,
  ];

  const filledFields = fields.filter(Boolean).length;
  return Math.round((filledFields / fields.length) * 100);
}
