import jwt from 'jsonwebtoken';
import UserEntity from '../../entities/UserEntity';
import { IUserRepository } from '../../repositories/IUserRepository';
import { ICheckTokenUseCase } from '../ICheckTokenUseCase';
import environments from '../../main/environment';

export default class CheckToken implements ICheckTokenUseCase {
  constructor(
    private userRepository: IUserRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(token: string): Promise<UserEntity> {
    const payload: any = jwt.verify(token, environments.TOKEN_SECRET);
    const { email } = payload;

    const user = await this.userRepository.selectAsync(email);
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
