import z from "zod";

// Define the login schema
export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .min(1, "Email cannot be empty")
    .email("Invalid email format")
    .trim()
    .toLowerCase()
    .max(255, "Email must not exceed 255 characters"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long")
    .max(100, "Password must not exceed 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    ),

  rememberMe: z.boolean().default(false),
});

export type Login = z.infer<typeof LoginSchema>;
