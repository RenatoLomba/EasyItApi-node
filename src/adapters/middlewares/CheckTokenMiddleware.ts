import { Request, Response, NextFunction } from 'express';
import { ICheckTokenUseCase } from '../../usecases/ICheckTokenUseCase';
import { DefaultError } from '../errors/DefaultError';

export class CheckTokenMiddleware {
  constructor(
    private checkTokenUseCase: ICheckTokenUseCase,
  ) {
    this.check = this.check.bind(this);
  }

  async check(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { authorization } = req.headers;
    if (!authorization) throw new DefaultError('Login Required');

    const [, token] = authorization.split(' ');

    const user = await this.checkTokenUseCase.execute(token);

    req.body.currentUser = { id: user.id, email: user.email };

    return next();
  }
}
