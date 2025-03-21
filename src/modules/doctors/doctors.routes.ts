import {Router} from 'express';
import * as doctorsControllers from './doctors.controller';
import {validateBodyDto, validateQueryDto} from '../../middlewares';
import {
  createDoctorSchema,
  createSlotSchema,
  getAvailableSlotsQuerySchema,
  getBookedSlotsQuerySchema,
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

router.get(
  '/:id/available_slots',
  validateQueryDto(getAvailableSlotsQuerySchema),
  doctorsControllers.getAvailableSlots,
);

router.get(
  '/:id/bookings',
  validateQueryDto(getBookedSlotsQuerySchema),
  doctorsControllers.getBookedSlots,
);

router.post(
  '/:id/slots',
  validateBodyDto(createSlotSchema),
  doctorsControllers.createSlots,
);

export default router;
