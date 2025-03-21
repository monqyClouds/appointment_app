import {CreateDoctorDto, CreateSlotsDto, GetDoctorsQueryDto} from './dto';
import prisma from '../../utils/prisma';
import {createId} from '@paralleldrive/cuid2';
import {Response} from 'express';
import {logger} from '../../middlewares';
import {errorDispatcher, ErrorTypes} from '../../utils';
import {PrismaClientKnownRequestError} from '@prisma/client/runtime/library';
import dayjs, {Dayjs} from 'dayjs';

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

export async function createSlots(
  dto: CreateSlotsDto,
  doctorId: string,
  res: Response,
) {
  try {
    const generatedSlots = generateSlots(dto);

    await prisma.slot.createMany({
      data: generatedSlots.map(slot => ({
        id: createId(),
        doctorId,
        startTime: slot.startTime,
        endTime: slot.endTime,
      })),
      skipDuplicates: true,
    });

    return generatedSlots;
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError && err.code === 'P2003') {
      return errorDispatcher(res, {
        type: ErrorTypes.BadRequest,
        message: 'Invalid doctor identifier',
      });
    }

    logger.error(err);
    return errorDispatcher(res);
  }
}

function generateSlots(dto: CreateSlotsDto) {
  const endDate =
    dto.daily || dto.weekdays ? dto.endTime.endOf('year') : dto.endTime;

  const dailyStartHour = dto.startTime.hour();
  const dailyStartMinute = dto.startTime.minute();
  const dailyEndHour = dto.endTime.hour();
  const dailyEndMinute = dto.endTime.minute();

  let availableDates;

  if (dto.daily) {
    availableDates = generateAvailableDates({
      startDate: dto.startTime.startOf('day'),
      endDate,
      weekdays: [
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
      ],
    });
  } else if (dto.weekdays) {
    availableDates = generateAvailableDates({
      startDate: dto.startTime.startOf('day'),
      endDate,
      weekdays: dto.weekdays,
    });
  } else {
    availableDates = [dto.startTime.startOf('day')];
  }

  const slotTimes: {startTime: Date; endTime: Date}[] = [];

  availableDates.forEach(date => {
    const dailyEndTime = dayjs(date)
      .set('hour', dailyEndHour)
      .set('minute', dailyEndMinute);

    const dailyStartTime = dayjs(date)
      .set('hour', dailyStartHour)
      .set('minute', dailyStartMinute);

    let slotStartTime = dailyStartTime;

    while (dailyEndTime.diff(slotStartTime, 'minutes') >= dto.duration) {
      const endTime = slotStartTime.add(dto.duration, 'minutes');

      if (dailyEndTime >= endTime && dailyStartTime <= slotStartTime) {
        slotTimes.push({
          startTime: slotStartTime.toDate(),
          endTime: endTime.toDate(),
        });
      }

      slotStartTime = endTime;
    }
  });

  return slotTimes;
}

function generateAvailableDates(dto: {
  endDate: Dayjs;
  startDate: Dayjs;
  weekdays: Required<CreateSlotsDto>['weekdays'];
}) {
  const daysCount = dto.endDate.diff(dto.startDate, 'days');
  const weeksCount = Math.ceil(daysCount / 7);

  const availableDays = new Set<number>();

  dto.weekdays.forEach(day => {
    availableDays.add(WeekDays[day]);
  });

  const sortedAvailableDays = Array.from(availableDays).toSorted(
    (a, b) => a - b,
  );

  const availableDates: Dayjs[] = [];

  const startWeek = dto.startDate.startOf('week');

  for (let weekOffset = 0; weekOffset <= weeksCount; weekOffset++) {
    const currentWeek = startWeek.add(weekOffset, 'weeks');

    for (const dayOfWeek of sortedAvailableDays) {
      const date = currentWeek.day(dayOfWeek);

      if (date >= dto.startDate && date <= dto.endDate) {
        availableDates.push(date);
      }
    }
  }

  return availableDates;
}

enum WeekDays {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}
