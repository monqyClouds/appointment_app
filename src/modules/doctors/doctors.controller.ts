import {Request, Response} from 'express';
import {CreateDoctorDto, CreateSlotsDto, GetDoctorsQueryDto} from './dto';
import * as doctorsService from './doctors.service';
import {successResDispatcher} from '../../utils';

export async function createDoctor(req: Request, res: Response) {
  const data = await doctorsService.createDoctor(
    req.body as unknown as CreateDoctorDto,
    res,
  );

  successResDispatcher(res, {statusCode: 201, data});
}

export async function getDoctors(req: Request, res: Response) {
  const data = await doctorsService.getDoctors(
    req.query as unknown as GetDoctorsQueryDto,
    res,
  );

  successResDispatcher(res, {statusCode: 200, data});
}

export async function createSlots(req: Request, res: Response) {
  const data = await doctorsService.createSlots(
    req.body as unknown as CreateSlotsDto,
    req.params.id,
    res,
  );

  successResDispatcher(res, {statusCode: 201, data});
}
