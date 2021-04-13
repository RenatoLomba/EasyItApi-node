import 'reflect-metadata';
import express, {
  Request, Response,
} from 'express';
import 'express-async-errors';
import { resolve } from 'path';
import { createLocalConnection } from '../database';
import { router } from './routes';

import { DefaultError } from '../adapters/errors/DefaultError';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, '..', '..', 'uploads', 'images')));

createLocalConnection().then(() => {
  router(app);
  app.use((err: Error, request: Request, response: Response) => {
    if (err instanceof DefaultError) {
      return response.status(err.statusCode).json({ error: err.message });
    }
    return response.status(500).json({ error: 'Internal Server Error' });
  });
});

export { app };
