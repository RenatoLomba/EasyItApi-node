import UserEntity from '../entities/UserEntity';

export interface ICheckTokenUseCase {
  execute(token: string): Promise<UserEntity>;
}
