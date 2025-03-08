import { z } from "zod";

export const signInFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Please enter a password " })
});

export const signUpSchema = z
  .object({
    name: z
      .string({
        required_error: "Please enter a valid Name"
      })
      .min(1, { message: "Name is required" })
      .max(50, { message: "Name must not exceed 50 characters" }),

    email: z.string().email({ message: "Invalid email address" }),

    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character"
        }
      ),

    confirmPassword: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"] // This ensures the error appears under confirmPassword field
  });

export const addPostSchema = z.object({
  title: z
    .string({
      required_error: "Please enter a valid Title"
    })
    .min(1, { message: "Title is required" })
    .max(50, { message: "Title must not exceed 50 characters" }),

  content: z
    .string({
      required_error: "Please enter a valid content"
    })
    .min(1, { message: "content is required" })
    .max(50, { message: "content must not exceed 50 characters" })
});

export const addCommentSchema = z.object({
  comment: z
    .string({
      required_error: "Please enter a valid Comment"
    })
    .min(1, { message: "Comment is required" })
    .max(50, { message: "Comment must not exceed 50 characters" })
});
