import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password too long")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|;:'",.<>\/\\]).{8,32}$/,
      "Password must include at least one letter, one number, and one special character",
    ),
});

export const cardIdSchema = z.object({ id: z.string().min(1) });
