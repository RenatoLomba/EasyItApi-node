import { ExpertEntity } from '../../entities/ExpertEntity';
import { IAvatarRepository } from '../../repositories/IUserAvatarRepository';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { IGetExpertsUseCase } from '../IGetExpertsUseCase';

export class GetExpertsUseCase implements IGetExpertsUseCase {
  constructor(
    private expertRepository: IExpertRepository,
    private avatarRepository: IAvatarRepository,
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
    if (expertList.length > 0) {
      expertList.map(async (expert) => {
        const expertModified = new ExpertEntity(expert);
        expertModified.avatar = await this.avatarRepository.selectByExternalId(expert.id);
        return expertModified;
      });
    }
    return expertList;
  }
}
