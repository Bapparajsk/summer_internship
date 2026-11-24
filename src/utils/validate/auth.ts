import { z } from "zod";

export const signinSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Include at least one uppercase letter")
    .regex(/[a-z]/, "Include at least one lowercase letter")
    .regex(/[0-9]/, "Include at least one number"),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be 50 characters or fewer"),
    email: z
      .email("Enter a valid email address")
      .trim()
      .toLowerCase()
      .max(254, "Email address is too long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be 128 characters or fewer")
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[a-z]/, "Include at least one lowercase letter")
      .regex(/[0-9]/, "Include at least one number")
      .regex(/[^A-Za-z0-9]/, "Include at least one special character"),
    confirmPassword: z
      .string()
      .min(1, "Confirm your password")
      .max(128, "Password must be 128 characters or fewer"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SigninFormValues = z.infer<typeof signinSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;