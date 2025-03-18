import helmet from 'helmet';
import cors from 'cors';
import express, {Express, Request, Response} from 'express';
import {
  rateLimiter,
  successLogger,
  errorLogger,
  corsOptionsDelegate,
} from './middlewares';
import api from './modules/api';
import {ENVIRONMENT} from './config';
const app: Express = express();

app.use(helmet());

app.use(successLogger);
app.use(errorLogger);

app.set('trust proxy', 1);

app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/health', rateLimiter, (req: Request, res: Response) => {
  res.send('it works');
});

if (ENVIRONMENT === 'production') {
  app.use('/api/v1', rateLimiter, api);
}

app.all('*', rateLimiter, (req: Request, res: Response) => {
  res.status(404).json({
    message: `Route: ${req.originalUrl} not found`,
  });
});

export default app;
