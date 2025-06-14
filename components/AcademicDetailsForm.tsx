"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AcademicDetailsForm() {
  const { register, setValue, watch } = useFormContext();

  const degree = watch("degree");
  const year_of_study = watch("year_of_study");

  return (
    <div className="space-y-5 md:space-y-3">
      <div className=" animate-slide-up stagger-1">
        <Label htmlFor="college_name">College Name</Label>
        <Input
          id="college_name"
          placeholder="ABC University"
          required
          {...register("college_name")}
          className="form-field-animation"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className=" animate-slide-up stagger-2">
          <Label htmlFor="degree">Degree</Label>
          <Select
            value={degree}
            onValueChange={(value) => setValue("degree", value)}
          >
            <SelectTrigger id="degree" className="form-field-animation">
              <SelectValue placeholder="Select degree" />
            </SelectTrigger>
            <SelectContent className="animate-scale-in">
              <SelectItem value="B.Tech">B.Tech</SelectItem>
              <SelectItem value="B.E.">B.E.</SelectItem>
              <SelectItem value="M.Tech">M.Tech</SelectItem>
              <SelectItem value="BCA">BCA</SelectItem>
              <SelectItem value="MCA">MCA</SelectItem>
              <SelectItem value="B.Sc">B.Sc</SelectItem>
              <SelectItem value="M.Sc">M.Sc</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className=" animate-slide-up stagger-3">
          <Label htmlFor="branch">Branch</Label>
          <Input
            id="branch"
            placeholder="Computer Science"
            required
            {...register("branch")}
            className="form-field-animation"
          />
        </div>
      </div>

      <div className=" animate-slide-up stagger-4">
        <Label htmlFor="year_of_study">Year of Study</Label>
        <Select
          value={year_of_study}
          onValueChange={(value) => setValue("year_of_study", value)}
        >
          <SelectTrigger id="year_of_study" className="form-field-animation">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent className="animate-scale-in">
            <SelectItem value="1">1st Year</SelectItem>
            <SelectItem value="2">2nd Year</SelectItem>
            <SelectItem value="3">3rd Year</SelectItem>
            <SelectItem value="4">4th Year</SelectItem>
            <SelectItem value="5">5th Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default AcademicDetailsForm;
