import { ExpertEntity } from '../entities/ExpertEntity';

export interface IGetExpertsUseCase {
  execute(location?: string): Promise<ExpertEntity[]>;
}
