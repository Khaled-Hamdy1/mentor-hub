"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import type { CreateProfileForm } from "@/app/api/user/schema";
import { Label } from "@/components/ui/label";

export default function ChangeDate() {
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const {
    setValue,
    formState: { errors },
  } = useFormContext<CreateProfileForm>();

  const onChangeBirthDate = (date: Date | undefined) => {
    if (!date) return;
    setValue("dateOfBirth", date);
    setDateOfBirth(date);
  };
  return (
    <div className="space-y-2">
      <Label
        htmlFor="dateOfBirth"
        className="text-sm font-medium text-slate-800"
      >
        Date of Birth
      </Label>
      <input
        id="dateOfBirth"
        type="date"
        value={dateOfBirth?.toISOString().split("T")[0]}
        onChange={(e) => onChangeBirthDate(new Date(e.target.value))}
        className="w-full h-12 rounded-lg border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 bg-white shadow-sm px-3"
      />
      {errors.dateOfBirth && (
        <p className="text-xs text-red-500">{errors.dateOfBirth.message}</p>
      )}
    </div>
  );
}
