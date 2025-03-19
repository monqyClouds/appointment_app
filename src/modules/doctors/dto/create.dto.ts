import {z} from 'zod';
import {nonEmptyString} from '../../../utils';

export const createDoctorSchema = z.object({
  userName: nonEmptyString,
  firstName: nonEmptyString,
  lastName: nonEmptyString,
});

export type CreateDoctorDto = z.infer<typeof createDoctorSchema>;
