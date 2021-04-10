import { Token } from '../entities/Token';
import { ILoginDTO } from './dtos/ILoginDTO';

export interface ILoginUseCase {
  execute(user: ILoginDTO): Promise<Token>
}
