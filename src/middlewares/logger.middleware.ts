import pinoHttp from 'pino-http';
import pino from 'pino';
import 'pino-pretty';
import {createId} from '@paralleldrive/cuid2';
import {Response, Request} from 'express';
import {ENVIRONMENT} from '../config';

export const logger = pino({
  level: ENVIRONMENT === 'production' ? 'info' : 'debug',
  transport:
    ENVIRONMENT !== 'production'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore:
              'pid,host,context,req,res,responseTime,trace_id,span,trace_flags,correlationId',
            messageFormat:
              'pid:{pid} - url:{req.url} - status:{res.statusCode} - responseTime:{responseTime} - msg: {msg}',
          },
        }
      : undefined,
});

export const loggerMiddleware = pinoHttp({
  logger,
  autoLogging: true,

  genReqId: function (req, res) {
    const existingID = req.id ?? req.headers['x-request-id'];

    if (existingID) {
      return existingID;
    }

    const id = createId();
    res.setHeader('X-Request-Id', id);
    return id;
  },

  serializers: {
    err: err => ({
      type: err.type,
      message: err.message,
      stack: err.stack,
      code: err.code,
    }),
    req: (req: Request) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      path: req.path,
      params: req.params,
      query: req.query,
      headers: {
        'user-agent': req.headers['user-agent'],
        'content-type': req.headers['content-type'],
      },
    }),
    res: (res: Response) => ({statusCode: res.statusCode}),
  },

  wrapSerializers: false,
});
