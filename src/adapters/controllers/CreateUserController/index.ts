import { Request, Response } from 'express';
import validator from 'validator';
import CreateUserDTOResult from './CreateUserDTOResult';
import { ICreateUserUseCase } from '../../../usecases/ICreateUserUseCase';

export default class CreateUserController {
  constructor(
    private createUserUseCase: ICreateUserUseCase,
  ) {
    this.handle = this.handle.bind(this);
  }

  async handle(req: Request, res: Response): Promise<Response> {
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
}
