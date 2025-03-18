/**
 * @module config
 * @description export configuration files
 */

import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
dotenvExpand.expand(dotenv.config());

/** App Properties */
export const APP_NAME = process.env.APP_NAME || 'EDOHIP Databank';

/** Environment */
export const ENVIRONMENT = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 8000;

/** MySQL Credentials  */
export const DATABASE_URL = process.env.DATABASE_URL;
export const DATABASE_USER = process.env.DATABASE_USER;
export const DATABASE_PASS = process.env.DATABASE_PASS;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_PORT = process.env.DATABASE_PORT;

/** Auth Credentials */
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const COOKIE_SECRET_KEY = process.env.COOKIE_SECRET_KEY;
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY;
export const TOTP_GENERATOR_SECRET = process.env.TOTP_GENERATOR_SECRET;
export const SESSION_DURATION_SECS = 2 * 60 * 60;
export const SESSION_DURATION_mSECS = SESSION_DURATION_SECS * 1000;
export const COOKIE_MAX_AGE = SESSION_DURATION_mSECS;
export const LOGIN_RESTRICTION_TIME_SECS = 2 * 60 * 60;
export const CACHE_SALT = process.env.CACHE_SALT!;
export const MAX_LOGIN_ATTEMPTS = 5;

/** Default User */
export const DEFAULT_USER_ROLE = 1;

/** Cors */
export const ALLOW_UNDEFINED_ORIGIN = process.env.ALLOW_UNDEFINED_ORIGIN;
export const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;
