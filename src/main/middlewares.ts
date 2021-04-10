import {
  Express, NextFunction, Request, Response,
} from 'express';
import { DefaultError } from '../adapters/errors/DefaultError';

function middlewares(app: Express): void {
  app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof DefaultError) {
      return response.status(err.statusCode).json({ error: err.message });
    }
    return response.status(500).json({ error: 'Internal Server Error' });
  });
}

export { middlewares };
