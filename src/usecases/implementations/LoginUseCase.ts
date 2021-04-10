import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Token } from '../../entities/Token';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ILoginDTO } from '../dtos/ILoginDTO';
import { ILoginUseCase } from '../ILoginUseCase';
import { ENV } from '../../main/environment';

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private userRepository: IUserRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(user: ILoginDTO): Promise<Token> {
    const userResult = await this.userRepository.selectCompleteAsync(user.email);

    if (!userResult) {
      throw new Error('User not found');
    }

    const authenticated = await compare(user.password, userResult.password);
    if (!authenticated) {
      throw new Error('Password invalid');
    }

    const jwtToken = jwt.sign(
      { id: userResult.id, email: userResult.email },
      ENV.TOKEN_SECRET,
      { expiresIn: ENV.TOKEN_EXPIRES },
    );

    const token = new Token(userResult, jwtToken, ENV.TOKEN_EXPIRES);
    return token;
  }
}
