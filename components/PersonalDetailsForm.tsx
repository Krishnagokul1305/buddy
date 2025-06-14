"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

function PersonalDetailsForm() {
  const { register } = useFormContext();

  return (
    <div className="space-y-5 md:space-y-3">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className=" animate-slide-up stagger-1">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            placeholder="johndoe"
            required
            {...register("username")}
            className="form-field-animation"
          />
        </div>
        <div className=" animate-slide-up stagger-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="John Doe"
            required
            {...register("name")}
            className="form-field-animation"
          />
        </div>
      </div>

      <div className=" animate-slide-up stagger-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          {...register("email")}
          className="form-field-animation"
        />
      </div>

      <div className=" animate-slide-up stagger-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          required
          {...register("password")}
          className="form-field-animation"
        />
      </div>

      <div className=" animate-slide-up stagger-5">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          placeholder="1234567890"
          {...register("phone")}
          className="form-field-animation"
        />
      </div>

      <div className=" animate-slide-up stagger-6">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself"
          rows={3}
          {...register("bio")}
          className="form-field-animation"
        />
      </div>
    </div>
  );
}

export default PersonalDetailsForm;
