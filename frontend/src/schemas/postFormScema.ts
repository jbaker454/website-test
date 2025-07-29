// src/schemas/userFormSchema.ts
import { z } from "zod";

export const postFormSchema = z.object({
  description: z.string().min(1, "description is required"),
  text: z.string().min(1, "required text"),
  publisher: z.uuid("Invalid publisher ID"),
});

export type PostFormData = z.infer<typeof postFormSchema>;