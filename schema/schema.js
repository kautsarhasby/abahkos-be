import { z } from "zod";

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8).max(24),
  gender: z.enum(["pria", "wanita"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(24),
});
