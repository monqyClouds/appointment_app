import {Response} from 'express';
import prisma from '../../utils/prisma';
import {errorDispatcher, ErrorTypes} from '../../utils';
import {logger} from '../../middlewares';
import {BookSlotDto} from './dto';
import {createId} from '@paralleldrive/cuid2';

export async function bookSlot(id: string, dto: BookSlotDto, res: Response) {
  try {
    const slot = await prisma.slot.findUnique({
      where: {id},
      select: {booking: {select: {id: true}}},
    });

    if (!slot) {
      return errorDispatcher(res, {
        type: ErrorTypes.NotFound,
        message: 'Slot not found',
      });
    }

    if (slot.booking) {
      return errorDispatcher(res, {
        type: ErrorTypes.BadRequest,
        message: 'Slot already booked',
      });
    }

    const booking = await prisma.booking.create({
      data: {
        id: createId(),
        patientName: dto.fullName,
        reason: dto.reason,
        bookedAt: new Date(),
        slotId: id,
      },
    });

    return booking;
  } catch (err) {
    logger.error(err);
    return errorDispatcher(res);
  }
}
