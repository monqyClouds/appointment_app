import {Router} from 'express';
import * as doctorsControllers from './doctors.controller';
import {validateBodyDto, validateQueryDto} from '../../middlewares';
import {
  createDoctorSchema,
  createSlotSchema,
  getDoctorsQuerySchema,
} from './dto';

const router = Router();

router.post(
  '/',
  validateBodyDto(createDoctorSchema),
  doctorsControllers.createDoctor,
);

router.get(
  '/',
  validateQueryDto(getDoctorsQuerySchema),
  doctorsControllers.getDoctors,
);

router.post(
  '/:id/slots',
  validateBodyDto(createSlotSchema),
  doctorsControllers.createSlots,
);

export default router;
