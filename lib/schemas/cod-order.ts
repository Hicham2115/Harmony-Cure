import { z } from "zod";

export const codOrderSchema = z.object({
  fullName: z.string().trim().min(2, "Nom trop court"),
  phone: z.string().trim().min(8, "Numéro de téléphone invalide"),
  address: z.string().trim().min(5, "Adresse trop courte"),
});

export type CodOrderInput = z.infer<typeof codOrderSchema>;
