import { ExpertEntity } from '../entities/ExpertEntity';

export interface IGetCompleteExpertUseCase {
  execute(id: string): Promise<ExpertEntity>;
}
