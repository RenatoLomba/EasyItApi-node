import { Request, Response, NextFunction } from 'express';
import { ICheckTokenUseCase } from '../../usecases/ICheckTokenUseCase';

export class CheckTokenMiddleware {
  constructor(
    private checkTokenUseCase: ICheckTokenUseCase,
  ) {
    this.check = this.check.bind(this);
  }

  async check(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(400).json({ error: 'Login Required' });
      return;
    }

    const [, token] = authorization.split(' ');

    try {
      const user = await this.checkTokenUseCase.execute(token);

      req.body.currentUser = { id: user.id, email: user.email };

      next();
    } catch (error) {
      res.status(400).json({ error: error.message || 'Unexpected Error' });
    }
  }
}
