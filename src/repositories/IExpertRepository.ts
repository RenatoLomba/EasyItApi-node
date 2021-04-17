import { ExpertEntity } from '../entities/ExpertEntity';

export interface IExpertRepository {
  selectAsync(email: string): Promise<ExpertEntity>;
  selectByIdAsync(id: string): Promise<ExpertEntity>;
  insertAsync(expert: ExpertEntity): Promise<ExpertEntity>;
  selectAllAsync(): Promise<ExpertEntity[]>;
  selectByLocationAsync(location: string): Promise<ExpertEntity[]>;
  selectCompleteAsync(id: string): Promise<ExpertEntity>;
  selectByServiceName(name: string): Promise<ExpertEntity[]>;
  updateAsync(expert: ExpertEntity): Promise<ExpertEntity>;
}
