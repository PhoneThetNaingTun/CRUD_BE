import * as z from "zod";
export const createRoleSchema = z.object({
  role: z.string(),
  permissionIds: z.array(z.string()),
});

export type CreateRoleSchema = z.infer<typeof createRoleSchema>;
