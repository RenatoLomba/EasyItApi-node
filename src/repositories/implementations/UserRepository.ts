import { getRepository } from 'typeorm';
import UserEntity from '../../entities/UserEntity';
import User from '../../database/models/User';
import { IUserRepository } from '../IUserRepository';

export default class UserRepository implements IUserRepository {
  constructor() {
    this.selectAsync = this.selectAsync.bind(this);
    this.insertAsync = this.insertAsync.bind(this);
  }

  async selectAsync(email: string): Promise<UserEntity> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne({ email });
    if (!user) return null;
    return new UserEntity(user);
  }

  async insertAsync(user: UserEntity): Promise<UserEntity> {
    const usersRepository = getRepository(User);
    const newUser = usersRepository.create(user);
    await usersRepository.save(newUser);
    return new UserEntity(newUser);
  }
}
