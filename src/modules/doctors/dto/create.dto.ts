import {z} from 'zod';
import dayjs from 'dayjs';
import {nonEmptyString} from '../../../utils';

export const createDoctorSchema = z.object({
  userName: nonEmptyString,
  firstName: nonEmptyString,
  lastName: nonEmptyString,
});

export const createSlotSchema = z
  .object({
    startTime: z.date({coerce: true}).min(new Date()).transform(dayjs),
    endTime: z.date({coerce: true}).transform(dayjs),
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
      ])
      .array()
      .min(1)
      .optional(),
  })
  .refine(
    ({startTime, endTime}) =>
      startTime.startOf('day').isSame(endTime.startOf('day')),
    {
      message: 'startTime and endTIme must be of the same date',
      path: ['endTime'],
    },
  )
  .refine(({startTime, endTime}) => endTime.isAfter(startTime), {
    message: 'endTime must be after startTime',
    path: ['endTime'],
  })
  .refine(({daily, weekdays}) => !(daily && weekdays), {
    message: 'Cannot add both daily and weekdays',
    path: ['weekdays'],
  });

export type CreateDoctorDto = z.infer<typeof createDoctorSchema>;

export type CreateSlotsDto = z.infer<typeof createSlotSchema>;
