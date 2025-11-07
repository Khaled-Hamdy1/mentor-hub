import { Gender } from "@prisma/client";
import { User } from "lucide-react";
import z from "zod";

export const CreateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().nullable(),
  dateOfBirth: z
    .date({
      required_error: "Date of birth is required",
    })
    .max(new Date(), "Date of birth cannot be in the future")
    .max(
      new Date(new Date().setFullYear(new Date().getFullYear() - 13)),
      "You must be at least 13 years old",
    ),
  gender: z.enum([Gender.MALE, Gender.FEMALE]),
  skills: z.string().min(1, "Please add at least one skill"),
  jobTitle: z.string(),
  about: z.string().nullable(),
  availableForMentoring: z.boolean(),
  avatarLink: z.string().url().nullable(),
  avatarFile: z.instanceof(File).nullable(),
  userId: z.string(),
});

export type CreateProfileForm = z.infer<typeof CreateProfileSchema>;
