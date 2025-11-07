"use client";

import { Briefcase } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import type { CreateProfileForm as FormData } from "@/app/api/user/schema";
import InputText from "@/components/shared/text-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { LOGIN } from "@/constants/images";
import { objectToFormData } from "@/utils/form-data-handler";
import AsidePanel from "./aside-panel";
import AvatarUpload from "./avatar-upload";
import ChangeDate from "./change-date";
import GenderPicker from "./gender-picker";
import Header from "./header";

export default function CreateProfileForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableForMentoring, setAvailableForMentoring] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useFormContext<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        body: objectToFormData({ ...data }),
      });

      if (!response.ok) throw new Error("Failed to create profile");

      toast.success("Profile created successfully!");
      // router.push("/dashboard");
    } catch (error) {
      console.error("Profile creation error:", error);
      toast.error("Failed to create profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={LOGIN}
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-darkblue/30 via-blue-600/20 to-purple-600/25" />
      </div>

      {/* Form Container with Backdrop Blur */}
      <div className="relative z-10 w-full max-w-4xl mx-4 my-12">
        <Card className="shadow-[0_10px_30px_rgba(2,6,23,0.25)] border border-white/10 rounded-3xl backdrop-blur-lg bg-white/85 overflow-hidden">
          {/* Improved header with friendly messaging */}
          <Header />

          <CardContent className="px-6 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Form column (left 2/3 on md+) */}
              <div className="md:col-span-2">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  {/* Avatar Upload */}
                  <AvatarUpload />

                  {/* Name */}
                  <InputText
                    label="Full Name"
                    placeholder="Enter your full name"
                    type="text"
                    name="name"
                    register={register}
                    classNames={{
                      label: "text-sm font-medium text-slate-800 mb-1",
                      input:
                        "h-12 rounded-lg border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 bg-white shadow-sm",
                    }}
                    error={errors.name?.message}
                  />

                  {/* Phone & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputText
                      label="Phone Number"
                      placeholder="+20 123 456 7890"
                      type="tel"
                      name="phone"
                      register={register}
                      classNames={{
                        label: "text-sm font-medium text-slate-800 mb-1",
                        input:
                          "h-12 rounded-lg border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 bg-white shadow-sm",
                      }}
                      error={errors.phone?.message}
                    />

                    <InputText
                      label="Location (Optional)"
                      placeholder="Cairo, Egypt"
                      type="text"
                      name="location"
                      register={register}
                      classNames={{
                        label: "text-sm font-medium text-slate-800 mb-1",
                        input:
                          "h-12 rounded-lg border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 bg-white shadow-sm",
                      }}
                      error={errors.location?.message}
                    />
                  </div>

                  {/* Job Title */}
                  <InputText
                    label="Job Title (Optional)"
                    placeholder="e.g. Software Engineer, UI/UX Designer"
                    type="text"
                    name="jobTitle"
                    register={register}
                    classNames={{
                      label: "text-sm font-medium text-slate-800 mb-1",
                      input:
                        "h-12 rounded-lg border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 bg-white shadow-sm",
                    }}
                    error={errors.jobTitle?.message}
                  />
                  {/* Date of Birth & Gender */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ChangeDate />
                    <GenderPicker setValue={setValue} errors={errors} />
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="skills"
                      className="text-sm font-medium text-slate-800"
                    >
                      Skills
                    </Label>
                    <Textarea
                      id="skills"
                      placeholder="e.g. JavaScript, React, Node.js"
                      {...register("skills")}
                      className="min-h-[90px] rounded-lg border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none bg-white shadow-sm"
                    />
                    {errors.skills && (
                      <p className="text-xs text-red-500">
                        {errors.skills.message}
                      </p>
                    )}
                    <p className="text-xs text-slate-500">
                      Separate multiple skills with commas
                    </p>
                  </div>

                  {/* About */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="about"
                      className="text-sm font-medium text-slate-800"
                    >
                      About Me (Optional)
                    </Label>
                    <Textarea
                      id="about"
                      placeholder="A short bio to introduce yourself"
                      {...register("about")}
                      className="min-h-[120px] rounded-lg border border-slate-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-50 resize-none bg-white shadow-sm"
                    />
                    {errors.about && (
                      <p className="text-xs text-red-500">
                        {errors.about.message}
                      </p>
                    )}
                  </div>

                  {/* Mentoring toggle */}
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 rounded-md">
                        <Briefcase className="h-5 w-5 text-slate-700" />
                      </div>
                      <div>
                        <Label
                          htmlFor="mentoring"
                          className="text-sm font-medium text-slate-800"
                        >
                          Available for Mentoring
                        </Label>
                        <p className="text-xs text-slate-500">
                          Show that you’re open to mentor requests
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="mentoring"
                      checked={availableForMentoring}
                      onCheckedChange={(checked) => {
                        setAvailableForMentoring(checked);
                        setValue("availableForMentoring", checked);
                      }}
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-sm font-semibold rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 shadow-md"
                    >
                      {isSubmitting
                        ? "Creating Profile..."
                        : "Complete Profile"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Right panel (md only) */}
              <AsidePanel />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
