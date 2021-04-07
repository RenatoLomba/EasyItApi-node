import { Request, Response, NextFunction } from 'express';
import { ICheckTokenUseCase } from '../../../usecases/ICheckTokenUseCase';

export default class CheckTokenMiddleware {
  constructor(
    private checkTokenUseCase: ICheckTokenUseCase,
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response, next: NextFunction): Promise<any> {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(400).json({ error: 'Login Required' });
    }

    const [, token] = authorization.split(' ');

    try {
      const user = await this.checkTokenUseCase.execute(token);

      req.body.currentUser = { id: user.id, email: user.email };

      return next();
    } catch (error) {
      return res.status(400).json({ error: error.message || 'Unexpected Error' });
    }
  }
}
