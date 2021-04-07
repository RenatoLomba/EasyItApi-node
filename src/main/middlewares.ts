import express, { Express } from 'express';
import { resolve } from 'path';

function middlewares(app: Express): void {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(resolve(__dirname, '..', '..', 'uploads', 'images')));
}

export default middlewares;
