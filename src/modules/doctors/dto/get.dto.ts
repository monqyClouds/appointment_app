import {z} from 'zod';

export const getDoctorsQuerySchema = z
  .object({
    skip: z.number({coerce: true}).int().min(0).optional(),
    limit: z.number({coerce: true}).int().positive().optional(),
  })
  .strip();

export const getBookedSlotsQuerySchema = getDoctorsQuerySchema.extend({
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
});

export const getAvailableSlotsQuerySchema = getDoctorsQuerySchema.extend({
  date: z.string().date().optional(),
});

export type GetDoctorsQueryDto = z.infer<typeof getDoctorsQuerySchema>;

export type GetBookedSlotsQueryDto = z.infer<typeof getBookedSlotsQuerySchema>;

export type GetAvailableSlotsQueryDto = z.infer<
  typeof getAvailableSlotsQuerySchema
>;
