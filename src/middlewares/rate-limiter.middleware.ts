import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins in milliseconds
  limit: 100,
  legacyHeaders: false,
  standardHeaders: true,
  skipSuccessfulRequests: true,
});
