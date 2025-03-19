import {z} from 'zod';

export const nonEmptyString = z.string().trim().nonempty();
