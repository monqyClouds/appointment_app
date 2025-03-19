import {NextFunction, Request, Response} from 'express';
import {ZodError, ZodSchema} from 'zod';

export const validateBodyDto =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({errors: (error as ZodError).errors});
    }
  };

export const validateQueryDto =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.query = schema.parse(req.query);
      next();
    } catch (error) {
      res.status(400).json({errors: (error as ZodError).errors});
    }
  };
