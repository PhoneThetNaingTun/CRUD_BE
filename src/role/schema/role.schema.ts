import * as z from "zod";
export const createRoleSchema = z.object({
  role: z.string(),
  rolePermissions: z.array(
    z.object({
      permission: z.object({ id: z.string() }),
    })
  ),
});
export const updateRoleSchema = z.object({
  role: z.string().optional(),
  rolePermissions: z
    .array(
      z.object({
        permission: z.object({ id: z.string() }),
      })
    )
    .optional(),
});

export type CreateRoleSchema = z.infer<typeof createRoleSchema>;
export type UpdateRoleSchema = z.infer<typeof updateRoleSchema>;
