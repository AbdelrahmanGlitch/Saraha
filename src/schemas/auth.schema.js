import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters.")
      .max(20, "Maximum length is 20 characters."),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("Invalid email address."),

    phone: z
      .string()
      .regex(/^01[0125][0-9]{8}$/, "Invalid phone number."),

    gender: z.enum(["Male", "Female"], {
      errorMap: () => ({
        message: "Please select a gender.",
      }),
    }),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain uppercase, lowercase and a number."
      ),

    cPassword: z.string(),
  })
  .refine((data) => data.password === data.cPassword, {
    path: ["cPassword"],
    message: "Passwords don't match.",
  });