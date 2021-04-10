import 'reflect-metadata';
import express from 'express';
import { createLocalConnection } from '../database';
import { router } from './routes';
import { middlewares } from './middlewares';

const app = express();

createLocalConnection().then(() => {
  middlewares(app);

  router(app);
});
export { app };
