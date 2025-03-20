import {z} from 'zod';
import {nonEmptyString} from '../../../utils';

export const createDoctorSchema = z.object({
  userName: nonEmptyString,
  firstName: nonEmptyString,
  lastName: nonEmptyString,
});

export const createSlotSchema = z
  .object({
    startTime: z.date({coerce: true}).min(new Date()),
    endTime: z.date({coerce: true}),
    duration: z.literal(15).or(z.literal(30)),
    daily: z.boolean().default(false),
    weekdays: z
      .enum([
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
        'EVERYDAY',
      ])
      .array()
      .min(1)
      .optional(),
  })
  .refine(({daily, weekdays}) => !(daily && weekdays), {
    message: 'Cannot add both daily and weekdays',
    path: ['weekdays'],
  });

export type CreateDoctorDto = z.infer<typeof createDoctorSchema>;

export type CreateSlotDto = z.infer<typeof createSlotSchema>;
