"use client";

import { Upload, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { CreateProfileForm } from "../../../api/profile/schema";

export default function AvatarUpload() {
  const { setValue, watch } = useFormContext<CreateProfileForm>();
  const avatarLink = watch("avatarLink");
  const avatarFile = watch("avatarFile");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!avatarLink && !avatarFile) {
      setPreview(null);
      return;
    } else if (avatarFile) {
      // Local File -> create a preview URL
      const objectUrl = URL.createObjectURL(avatarFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (avatarLink) {
      // Already a URL (from DB or default value)
      setPreview(avatarLink);
    }
  }, [avatarLink, avatarFile]);

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: validate file type/size
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    setValue("avatarFile", file, { shouldDirty: true });
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative group">
        <Avatar className="h-20 w-20 ring-2 ring-darkblue/15 shadow-md">
          <AvatarImage src={preview ?? undefined} alt="Profile" />
          <AvatarFallback className="bg-gradient-to-br from-blue-50 to-purple-50 text-darkblue text-xl">
            <User className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>

        <div className="absolute inset-0 rounded-full flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col items-center gap-1 text-white">
            <Upload className="h-5 w-5" />
            <span className="text-xs">Change</span>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
          onChange={handleFileChange}
          aria-label="Upload profile image"
        />
      </div>

      <div>
        <div className="text-sm font-semibold text-darkblue">Profile photo</div>
        <div className="text-xs text-slate-500">Square JPG/PNG — up to 2MB</div>
      </div>
    </div>
  );
}
