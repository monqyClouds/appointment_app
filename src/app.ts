import helmet from 'helmet';
import cors from 'cors';
import express, {Express, Request, Response} from 'express';
import {
  rateLimiter,
  corsOptionsDelegate,
  loggerMiddleware,
  logger,
} from './middlewares';
import api from './modules/api';

const app: Express = express();

app.use(helmet());

app.use(loggerMiddleware);

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/health', rateLimiter, (req: Request, res: Response) => {
  logger.info('logging');
  res.send('it works');
});

app.use('/api/v1', rateLimiter, api);

app.all('*', rateLimiter, (req: Request, res: Response) => {
  res.status(404).json({
    message: `Route: ${req.originalUrl} not found`,
  });
});

export default app;
