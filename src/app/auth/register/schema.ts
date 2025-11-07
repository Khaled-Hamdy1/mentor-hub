import z from "zod";

// Define the registration schema
export const RegisterSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .min(1, "Email cannot be empty")
      .email("Invalid email format")
      .trim()
      .toLowerCase()
      .max(255, "Email must not exceed 255 characters")
      .refine((val) => !val.includes(" "), "Email cannot contain spaces"),

    phone: z
      .string()
      .optional()
      .refine(
        (value) => !value || /^\+?[1-9]\d{9,14}$/.test(value),
        "Invalid phone number",
      ),

    name: z
      .string({ required_error: "Name is required" })
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must not exceed 100 characters")
      .trim()
      .regex(
        /^[a-zA-Z\s-]+$/,
        "Name can only contain letters, spaces, and hyphens",
      ),

    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters")
      .max(35, "Password must not exceed 35 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      )
      .refine((val) => !val.includes(" "), "Password cannot contain spaces"),

    repeatPassword: z.string({
      required_error: "Password confirmation is required",
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type Register = z.infer<typeof RegisterSchema>;
