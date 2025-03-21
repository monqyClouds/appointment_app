import type {Response} from 'express';

type SuccessResponseStruct = {
  statusCode: number;
  data: unknown;
};

export function successResDispatcher(
  res: Response,
  payload: SuccessResponseStruct,
) {
  if ((payload.data as {req: unknown})?.req) res;
  else res.status(payload.statusCode).json({data: payload.data});
}
