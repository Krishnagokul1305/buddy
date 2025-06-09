"use client";

import { useForm, FormProvider } from "react-hook-form";
import type { UserData } from "@/types/user";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap, Github, User, UserPlus } from "lucide-react";
import Link from "next/link";
import PersonalDetailsForm from "./PersonalDetailsForm";
import AcademicDetailsForm from "./AcademicDetailsForm";
import SocialMediaForm from "./SocialMediaForm";
import { signUpAction } from "@/lib/actions";
import { toast } from "sonner";

function RegisterForm() {
  const methods = useForm<UserData>({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      name: "",
      phone: "",
      bio: "",
      college_name: "",
      year_of_study: 0,
      degree: "",
      branch: "",
      github_username: "",
      leetcode_username: "",
      linkedin_username: "",
      resume_link: "",
      profile_picture: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("personal");

  const onSubmit = async (data: UserData) => {
    try {
      await signUpAction(data);
      toast("Registration successful!");
    } catch (err) {
      console.error(err);
      toast("Registration failed!");
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>
          Join PlacementBuddy to start your journey
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {error && (
              <div className="p-3 mb-4 text-sm text-white bg-destructive rounded">
                {error}
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="personal">
                  <User className="h-4 w-4" />
                  Personal
                </TabsTrigger>
                <TabsTrigger value="academic">
                  <GraduationCap className="h-4 w-4" />
                  Academic
                </TabsTrigger>
                <TabsTrigger value="social">
                  <Github className="h-4 w-4" />
                  Social
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <PersonalDetailsForm />
                <div className="flex justify-end mt-3">
                  <Button
                    type="button"
                    onClick={() => setActiveTab("academic")}
                  >
                    Next
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="academic">
                <AcademicDetailsForm />
                <div className="flex justify-between mt-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("personal")}
                  >
                    Previous
                  </Button>
                  <Button onClick={() => setActiveTab("social")}>Next</Button>
                </div>
              </TabsContent>

              <TabsContent value="social">
                <SocialMediaForm />
                <div className="flex justify-between mt-3">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("academic")}
                  >
                    Previous
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </FormProvider>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
        <Link
          href="/"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
      </CardFooter>
    </Card>
  );
}

export default RegisterForm;
