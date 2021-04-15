import { getRepository } from 'typeorm';
import { ExpertAvatar } from '../../database/models/ExpertAvatar';
import { ExpertAvatarEntity } from '../../entities/ExpertAvatarEntity';
import { IExpertAvatarRepository } from '../IExpertAvatarRepository';

export class ExpertAvatarRepository implements IExpertAvatarRepository {
  async selectByExpertId(id: string): Promise<ExpertAvatarEntity> {
    const repository = getRepository(ExpertAvatar);
    const avatar = await repository.findOne({ expert_id: id });
    if (!avatar) return null;
    return new ExpertAvatarEntity(avatar);
  }

  async insertAsync(avatar: ExpertAvatarEntity): Promise<ExpertAvatarEntity> {
    const repository = getRepository(ExpertAvatar);
    const newAvatar = repository.create(avatar);
    await repository.save(newAvatar);
    return new ExpertAvatarEntity(newAvatar);
  }
}
