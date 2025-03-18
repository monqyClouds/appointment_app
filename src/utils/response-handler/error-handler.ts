import type {Response} from 'express';

export enum ErrorTypes {
  Unauthorized,
  Forbidden,
  BadRequest,
  NotAllowed,
  NoResourceFound,
  DatabaseConflict,
  DatabaseError,
  FileError,
  ReadFileError,
  NotFound,
  ServerError,
  BadGateway,
}

export function errorDispatcher(
  res: Response,
  errorData: {type: ErrorTypes; message: string; errors: unknown},
) {
  const {type, message, errors} = errorData;
  let status: number;

  switch (type) {
    case ErrorTypes.BadRequest:
      status = 400;
      break;
    case ErrorTypes.Unauthorized:
      status = 401;
      break;
    case ErrorTypes.Forbidden:
      status = 403;
      break;
    case ErrorTypes.NotFound:
      status = 404;
      break;
    case ErrorTypes.NotAllowed:
      status = 405;
      break;
    case ErrorTypes.NoResourceFound:
      status = 406;
      break;
    case ErrorTypes.DatabaseConflict:
      status = 409;
      break;
    case ErrorTypes.FileError:
      status = 415;
      break;
    case ErrorTypes.ReadFileError:
      status = 422;
      break;
    case ErrorTypes.ServerError:
      status = 500;
      break;
    case ErrorTypes.BadGateway:
      status = 502;
      break;
    case ErrorTypes.DatabaseError:
      status = 503;
      break;
    default:
      status = 500;
  }

  res.status(status).json({
    message,
    errors,
  });
}
