import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(2).max(100).nonempty(),
  description: z.string().trim().min(10).max(1000).nonempty(),
});
