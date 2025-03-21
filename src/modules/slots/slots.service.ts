import {Response} from 'express';
import prisma from '../../utils/prisma';
import {errorDispatcher, ErrorTypes} from '../../utils';
import {logger} from '../../middlewares';
import {BookSlotDto} from './dto';

export async function bookSlot(id: string, dto: BookSlotDto, res: Response) {
  try {
    const slot = await prisma.slot.findUnique({
      where: {id},
      select: {isBooked: true},
    });

    if (!slot) {
      return errorDispatcher(res, {
        type: ErrorTypes.NotFound,
        message: 'Slot not found',
      });
    }

    if (slot.isBooked) {
      return errorDispatcher(res, {
        type: ErrorTypes.BadRequest,
        message: 'Slot already booked',
      });
    }

    const bookedAt = new Date();

    await prisma.slot.updateMany({
      where: {id},
      data: {isBooked: true, bookedAt, bookedBy: dto.fullName},
    });

    return {
      id,
      isBooked: true,
      bookedAt,
    };
  } catch (err) {
    logger.error(err);
    return errorDispatcher(res);
  }
}
