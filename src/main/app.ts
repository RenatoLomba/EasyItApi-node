import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import { resolve } from 'path';
import { createLocalConnection } from '../database';
import { router } from './routes';
import { middlewares } from './middlewares';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, '..', '..', 'uploads', 'images')));

createLocalConnection().then(() => {
  router(app);
  middlewares(app);
});

export { app };
