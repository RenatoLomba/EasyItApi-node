import jwt from 'jsonwebtoken';
import { UserEntity } from '../../entities/UserEntity';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ICheckTokenUseCase } from '../ICheckTokenUseCase';
import { ENV } from '../../main/environment';
import { DefaultError } from '../../adapters/errors/DefaultError';

export class CheckTokenUseCase implements ICheckTokenUseCase {
  constructor(
    private userRepository: IUserRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(token: string): Promise<UserEntity> {
    const payload: any = jwt.verify(token, ENV.TOKEN_SECRET);
    const { email } = payload;

    const user = await this.userRepository.selectAsync(email);
    if (!user) {
      throw new DefaultError('User not found');
    }

    return user;
  }
}
