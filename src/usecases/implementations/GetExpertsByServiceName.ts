import { ExpertEntity } from '../../entities/ExpertEntity';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { IGetExpertsByServiceName } from '../IGetExpertsByServiceName';

export class GetExpertsByServiceName implements IGetExpertsByServiceName {
  constructor(
    private expertRepository: IExpertRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(name: string): Promise<ExpertEntity[]> {
    const experts = await this.expertRepository.selectByServiceName(name);
    return experts;
  }
}
