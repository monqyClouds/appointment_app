import {z} from 'zod';

export const getDoctorsQuerySchema = z
  .object({
    skip: z.number({coerce: true}).int().min(0).optional(),
    limit: z.number({coerce: true}).int().positive().optional(),
  })
  .strip();

export type GetDoctorsQueryDto = z.infer<typeof getDoctorsQuerySchema>;
