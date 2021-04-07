import UserEntity from '../entities/UserEntity';
import { ICreateUserDTO } from './dtos/ICreateUserDTO';

export interface ICreateUserUseCase {
  execute(user: ICreateUserDTO): Promise<UserEntity>;
}
