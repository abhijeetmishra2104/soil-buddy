import z from "zod";

export const CreateUserSchema = z.object({
  email: z.email(),
  name: z
    .string()
    .min(1, { message: "User name is required!" })
    .max(100, { message: "User name too long!" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" }),
});

export const SignInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" }),
});

export const chatSchema = z.object({
  role: z.enum(["User", "Agent"]),
  message: z.string(),
});
