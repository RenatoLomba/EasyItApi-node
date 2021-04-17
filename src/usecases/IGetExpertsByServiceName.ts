import { ExpertEntity } from '../entities/ExpertEntity';

export interface IGetExpertsByServiceName {
  execute(name: string): Promise<ExpertEntity[]>;
}
