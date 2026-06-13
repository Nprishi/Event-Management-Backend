import { z } from "zod";

export const updateEventSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(5).optional(),
  date: z.string().optional(),
  venue: z.string().optional(),
  capacity: z.number().positive().optional(),
  status: z.enum(["draft", "published"]).optional(),
});