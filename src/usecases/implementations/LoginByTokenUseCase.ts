import jwt from 'jsonwebtoken';
import { DefaultError } from '../../adapters/errors/DefaultError';
import { Token } from '../../entities/Token';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ILoginByTokenUseCase } from '../ILoginByTokenUseCase';

export class LoginByTokenUseCase implements ILoginByTokenUseCase {
  constructor(
    private userRepository: IUserRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(email: string): Promise<Token> {
    const userResult = await this.userRepository.selectCompleteAsync(email);

    if (!userResult) {
      throw new DefaultError('User not found');
    }

    const jwtToken = jwt.sign(
      { id: userResult.id, email: userResult.email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRES },
    );

    const token = new Token(userResult, jwtToken, process.env.TOKEN_EXPIRES);
    return token;
  }
}
