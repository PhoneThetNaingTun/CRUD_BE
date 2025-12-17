import * as z from "zod";
export const createProjectSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(100, "Name must be at most 100 characters long"),
  start_date: z.string().or(z.date()),
  end_date: z.string().or(z.date()),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
