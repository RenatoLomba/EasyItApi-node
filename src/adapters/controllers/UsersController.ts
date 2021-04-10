import { Request, Response } from 'express';
import validator from 'validator';
import { CreateUserDTOResult } from '../dtos/user/CreateUserDTOResult';
import { ICreateUserUseCase } from '../../usecases/ICreateUserUseCase';
import { ILoginUseCase } from '../../usecases/ILoginUseCase';
import { LoginDTOResult } from '../dtos/user/LoginDTOResult';

export class UsersController {
  constructor(
    private createUserUseCase: ICreateUserUseCase,
    private loginUseCase: ILoginUseCase,
  ) {
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ error: 'Campos vazios' });
    if (!validator.isEmail(email)) return res.status(400).json({ error: 'Email inválido' });

    try {
      const userCreated = await this.createUserUseCase.execute({ name, email, password });
      const userCreatedResult = new CreateUserDTOResult(userCreated);
      return res.status(201).json(userCreatedResult);
    } catch (error) {
      return res.status(400).json({ error: error.message || 'Unexpeted error' });
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
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
