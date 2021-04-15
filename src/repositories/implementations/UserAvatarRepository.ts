import { getRepository } from 'typeorm';
import { UserAvatar } from '../../database/models/UserAvatar';
import { UserAvatarEntity } from '../../entities/UserAvatarEntity';
import { IUserAvatarRepository } from '../IUserAvatarRepository';

export class UserAvatarRepoository implements IUserAvatarRepository {
  async selectByUserId(id: string): Promise<UserAvatarEntity> {
    const repository = getRepository(UserAvatar);
    const avatar = await repository.findOne({ where: { user_id: id } });
    if (!avatar) return null;
    return new UserAvatarEntity(avatar);
  }

  async insertAsync(avatar: UserAvatarEntity): Promise<UserAvatarEntity> {
    const repository = getRepository(UserAvatar);
    const newAvatar = repository.create(avatar);
    await repository.save(newAvatar);
    return new UserAvatarEntity(newAvatar);
  }
}
