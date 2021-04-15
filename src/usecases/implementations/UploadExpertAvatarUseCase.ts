import { DefaultError } from '../../adapters/errors/DefaultError';
import { ExpertAvatarEntity } from '../../entities/ExpertAvatarEntity';
import { IExpertAvatarRepository } from '../../repositories/IExpertAvatarRepository';
import { IExpertRepository } from '../../repositories/IExpertRepository';
import { IExpertAvatarDTO } from '../dtos/IExpertAvatarDTO';
import { IUploadExpertAvatarUseCase } from '../IUploadExpertAvatarUseCase';

export class UploadExpertAvatarUseCase implements IUploadExpertAvatarUseCase {
  constructor(
    private expertAvatarRepository: IExpertAvatarRepository,
    private expertRepository: IExpertRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(avatar: IExpertAvatarDTO): Promise<ExpertAvatarEntity> {
    const expert = await this.expertRepository.selectByIdAsync(avatar.expert_id);
    if (!expert) throw new DefaultError('Expert not found');

    const avatarAlreadyExists = await this.expertAvatarRepository.selectByExpertId(expert.id);
    if (avatarAlreadyExists) throw new DefaultError('Expert já possui avatar');

    const newAvatar = new ExpertAvatarEntity(avatar);
    const avatarCreated = await this.expertAvatarRepository.insertAsync(newAvatar);
    return avatarCreated;
  }
}
