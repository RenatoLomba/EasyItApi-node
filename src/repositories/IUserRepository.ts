import UserEntity from '../entities/UserEntity';

export interface IUserRepository {
  selectAsync(email: string): Promise<UserEntity>
  insertAsync(user: UserEntity): Promise<UserEntity>
}
