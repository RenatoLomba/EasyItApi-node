import { Request, Response } from 'express';
import validator from 'validator';
import { CreateUserDTOResult } from '../dtos/user/CreateUserDTOResult';
import { ICreateUserUseCase } from '../../usecases/ICreateUserUseCase';
import { ILoginUseCase } from '../../usecases/ILoginUseCase';
import { LoginDTOResult } from '../dtos/user/LoginDTOResult';
import { DefaultError } from '../errors/DefaultError';

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

    if (!name || !email || !password) throw new DefaultError('Alguns campos estão vazios');
    if (!validator.isEmail(email)) throw new DefaultError('Email inválido');

    const userCreated = await this.createUserUseCase.execute({ name, email, password });
    const userCreatedResult = new CreateUserDTOResult(userCreated);
    return res.status(201).json(userCreatedResult);
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    if (!email || !password) throw new DefaultError('Alguns campos estão vazios');
    if (!validator.isEmail(email)) throw new DefaultError('Email inválido');

    const authenticatedToken = await this.loginUseCase.execute({ email, password });
    const loginDTOResult = new LoginDTOResult(authenticatedToken);
    return res.status(200).json(loginDTOResult);
  }
}
