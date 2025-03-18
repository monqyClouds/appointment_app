import type {Response} from 'express';

type SuccessResponseStruct = {
  statusCode: number;
  data: unknown;
};

export function successResDispatcher(
  res: Response,
  payload: SuccessResponseStruct,
) {
  res.status(payload.statusCode).json({data: payload.data});
}
