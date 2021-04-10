import { UserEntity } from '../entities/UserEntity';

export interface IUserRepository {
  selectAsync(email: string): Promise<UserEntity>;
  selectCompleteAsync(email: string): Promise<UserEntity>
  selectByIdAsync(id: string): Promise<UserEntity>;
  insertAsync(user: UserEntity): Promise<UserEntity>;
}
