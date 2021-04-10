import { ExpertEntity } from '../entities/ExpertEntity';
import { ICreateExpertDTO } from './dtos/ICreateExpertDTO';

export interface ICreateExpertUseCase {
  execute(expert: ICreateExpertDTO): Promise<ExpertEntity>
}
