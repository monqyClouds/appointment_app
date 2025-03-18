import type {CorsOptionsDelegate} from 'cors';
import {Request} from 'express';
import {ALLOW_UNDEFINED_ORIGIN, ALLOWED_ORIGINS} from '../config';

const allowedOrigins = ALLOWED_ORIGINS?.split(',') ?? [];
const allowUndefinedOrigin = ALLOW_UNDEFINED_ORIGIN;

export const corsOptionsDelegate: CorsOptionsDelegate<Request> = function (
  req,
  callback,
) {
  const path = req.originalUrl;
  const skipUrls = ['/health', '/metrics'];

  const skipCors = skipUrls.includes(path);

  if (skipCors) {
    callback(null, {origin: false});
  } else {
    callback(null, {
      origin: function (origin: string | undefined, callback) {
        if (
          (!origin && allowUndefinedOrigin) ||
          (origin &&
            allowedOrigins.includes(origin as (typeof allowedOrigins)[number]))
        ) {
          callback(null, true);
        } else {
          const msg =
            'The CORS policy for this site does not allow access from the specified origin';
          callback(new Error(msg), false);
        }
      },
      optionsSuccessStatus: 204,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
    });
  }
};
