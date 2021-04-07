import 'reflect-metadata';
import express from 'express';
import createConnection from '../database';
import router from './routes';
import middlewares from './middlewares';

const app = express();

createConnection().then(() => {
  middlewares(app);

  router(app);
});
export default app;
