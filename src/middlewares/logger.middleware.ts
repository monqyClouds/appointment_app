import morgan from 'morgan';
import type {Request, Response} from 'express';

import {Logger} from '../utils/log-writer';

const skipSuccess = (req: Request, res: Response) => res.statusCode < 400;
const skipError = (req: Request, res: Response) => res.statusCode >= 400;

export const errorLogger = morgan('combined', {
  skip: skipSuccess,
  stream: Logger.errorFileStream,
});

export const successLogger = morgan('combined', {
  skip: skipError,
  stream: Logger.successResponseFileStream,
});
