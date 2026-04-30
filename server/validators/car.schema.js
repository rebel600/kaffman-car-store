import { z } from "zod";

export const carSchema = z.object({
  make: z.string().min(2, "Make too short"),
  model: z.string().min(2),
  price: z.coerce.number().positive(),
  year: z.number().min(1885).max(new Date().getFullYear()),
  imageUrl: z.string().url(),
});