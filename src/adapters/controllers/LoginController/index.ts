import { Request, Response } from 'express';
import validator from 'validator';
import LoginDTOResult from './LoginDTOResult';
import { ILoginUseCase } from '../../../usecases/ILoginUseCase';

export default class LoginController {
  constructor(
    private loginUseCase: ILoginUseCase,
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ error: 'Campos vazios' });
    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Email inválido' });

    try {
      const authenticatedToken = await this.loginUseCase.execute({ email, password });
      const loginDTOResult = new LoginDTOResult(authenticatedToken);
      return res.status(200).json(loginDTOResult);
    } catch (error) {
      return res.status(400).json({ error: error.message || 'Unexpected error' });
    }
  }
}
