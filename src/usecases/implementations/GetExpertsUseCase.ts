import { ExpertEntity } from '../../entities/ExpertEntity';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { IGetExpertsUseCase } from '../IGetExpertsUseCase';

export class GetExpertsUseCase implements IGetExpertsUseCase {
  constructor(
    private expertRepository: IExpertRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(location?: string): Promise<ExpertEntity[]> {
    let expertList: ExpertEntity[];
    if (location) {
      expertList = await this.expertRepository.selectByLocationAsync(location);
    } else {
      expertList = await this.expertRepository.selectAllAsync();
    }
    return expertList;
  }
}
