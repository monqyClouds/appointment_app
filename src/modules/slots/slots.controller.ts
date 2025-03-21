import {Response, Request} from 'express';
import * as slotsService from './slots.service';
import {successResDispatcher} from '../../utils';
import {BookSlotDto} from './dto';

export async function bookSlot(req: Request, res: Response) {
  const data = await slotsService.bookSlot(
    req.params.id,
    req.body as unknown as BookSlotDto,
    res,
  );

  successResDispatcher(res, {statusCode: 201, data});
}
