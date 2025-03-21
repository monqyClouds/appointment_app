import {z} from 'zod';

export const bookSlotSchema = z.object({
  fullName: z.string().trim().nonempty(),
  reason: z.string().trim().nonempty(),
});

export type BookSlotDto = z.infer<typeof bookSlotSchema>;
