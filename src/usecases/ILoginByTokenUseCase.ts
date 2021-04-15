import { Token } from '../entities/Token';

export interface ILoginByTokenUseCase {
  execute(email: string): Promise<Token>;
}
