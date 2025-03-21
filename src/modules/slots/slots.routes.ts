import {Router} from 'express';
import * as slotsController from './slots.controller';
import {validateBodyDto} from '../../middlewares';
import {bookSlotSchema} from './dto/create.dto';

const router = Router();

router.post(
  '/:id/book',
  validateBodyDto(bookSlotSchema),
  slotsController.bookSlot,
);

export default router;
