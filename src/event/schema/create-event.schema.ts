import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  date: z.string(),
  venue: z.string().min(2),
  capacity: z.number().positive(),
  status: z.enum(["draft", "published"]),
});