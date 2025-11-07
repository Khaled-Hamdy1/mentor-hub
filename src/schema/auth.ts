import { z } from "zod";

// Define the password reset schema
export const ForgetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type ForgetPassword = z.infer<typeof ForgetPasswordSchema>;
