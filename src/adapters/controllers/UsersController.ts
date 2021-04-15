import { Request, Response } from 'express';
import validator from 'validator';
import { CreateUserDTOResult } from '../dtos/user/CreateUserDTOResult';
import { ICreateUserUseCase } from '../../usecases/ICreateUserUseCase';
import { ILoginUseCase } from '../../usecases/ILoginUseCase';
import { LoginDTOResult } from '../dtos/user/LoginDTOResult';
import { DefaultError } from '../errors/DefaultError';
import { ILoginByTokenUseCase } from '../../usecases/ILoginByTokenUseCase';

export class UsersController {
  constructor(
    private createUserUseCase: ICreateUserUseCase,
    private loginUseCase: ILoginUseCase,
    private loginByTokenUseCase: ILoginByTokenUseCase,
  ) {
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.loginByToken = this.loginByToken.bind(this);
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

  async loginByToken(req: Request, res: Response): Promise<Response> {
    const { id, email } = req.body.currentUser;
    if (!id || !email) throw new DefaultError('Usuário precisa ter logado anteriormente');
    if (!validator.isEmail(email)) throw new DefaultError('Email inválido');

    const authenticatedToken = await this.loginByTokenUseCase.execute(email);
    const loginDTOResult = new LoginDTOResult(authenticatedToken);
    return res.status(200).json(loginDTOResult);
  }
}
