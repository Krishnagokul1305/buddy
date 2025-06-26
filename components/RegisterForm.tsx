"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import { UserData } from "@/types/user";
import { signUpAction } from "@/lib/actions";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UserData>();

  // watch password for confirm validation
  const password = watch("password", "");

  // your given onSubmit function
  const onSubmit = async (data: UserData) => {
    try {
      await signUpAction(data);
      toast("Registration successful!");
      router.push("/login");
    } catch (err) {
      toast("Registration failed!");
    }
  };

  return (
    <Card className="w-full max-w-md animate-scale-in card-hover">
      <CardHeader className="space-y-1">
        <div className="w-full flex justify-center mb-2">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-in">
            <UserPlus className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Register
        </CardTitle>
        <CardDescription className="text-center">
          Create your account to get started
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2 animate-slide-up stagger-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="yourusername"
              {...register("username", { required: "Username is required" })}
              aria-invalid={errors.username ? "true" : "false"}
              className="form-field-animation"
            />
            {errors.username && (
              <p role="alert" className="text-sm text-red-600 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2 animate-slide-up stagger-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Invalid email address",
                },
              })}
              aria-invalid={errors.email ? "true" : "false"}
              className="form-field-animation"
            />
            {errors.email && (
              <p role="alert" className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2 animate-slide-up stagger-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              aria-invalid={errors.password ? "true" : "false"}
              className="form-field-animation"
            />
            {errors.password && (
              <p role="alert" className="text-sm text-red-600 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2 animate-slide-up stagger-4">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              aria-invalid={errors.confirmPassword ? "true" : "false"}
              className="form-field-animation"
            />
            {errors.confirmPassword && (
              <p role="alert" className="text-sm text-red-600 mt-1">
                {errors?.confirmPassword?.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full animate-slide-up stagger-5 btn-hover-effect"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground animate-fade-in stagger-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-primary hover:underline font-medium"
          >
            Login
          </Link>
        </div>
        <Link
          href="/"
          className="flex items-center text-sm text-muted-foreground hover:text-foreground animate-fade-in stagger-7"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
      </CardFooter>
    </Card>
  );
}
