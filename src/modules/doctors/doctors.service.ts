import {CreateDoctorDto, GetDoctorsQueryDto} from './dto';
import prisma from '../../utils/prisma';
import {createId} from '@paralleldrive/cuid2';
import {Response} from 'express';
import {logger} from '../../middlewares';
import {errorDispatcher, ErrorTypes} from '../../utils';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';

export async function createDoctor(dto: CreateDoctorDto, res: Response) {
  const doctor = await prisma.doctor
    .create({
      data: {
        id: createId(),
        userName: dto.userName,
        firstName: dto.firstName,
        lastName: dto.lastName,
      },
      omit: {
        updatedAt: true,
      },
    })
    .catch(err => {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2002'
      ) {
        return errorDispatcher(res, {
          type: ErrorTypes.DatabaseConflict,
          message: 'Username already registered',
        });
      }

      logger.error(err);
      return errorDispatcher(res);
    });

  return doctor;
}

export async function getDoctors(query: GetDoctorsQueryDto, res: Response) {
  try {
    const [doctors, count] = await Promise.all([
      prisma.doctor.findMany({
        take: query.limit ?? 20,
        skip: query.skip,
        orderBy: [{firstName: 'asc'}, {lastName: 'asc'}, {createdAt: 'desc'}],
      }),
      prisma.doctor.count(),
    ]);

    return {doctors, count};
  } catch (err) {
    logger.error(err);
    return errorDispatcher(res);
  }
}
