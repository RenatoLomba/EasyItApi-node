import { DefaultError } from '../../adapters/errors/DefaultError';
import { UserAvatarEntity } from '../../entities/UserAvatarEntity';
import { IUserAvatarRepository } from '../../repositories/IUserAvatarRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IAvatarDTO } from '../dtos/IAvatarDTO';
import { IUploadUserAvatarUseCase } from '../IUploadUserAvatarUseCase';

export class UploadUserAvatarUseCase implements IUploadUserAvatarUseCase {
  constructor(
    private avatarRepository: IUserAvatarRepository,
    private userRepository: IUserRepository,
  ) {
    this.execute = this.execute.bind(this);
  }

  async execute(avatar: IAvatarDTO): Promise<UserAvatarEntity> {
    const user = await this.userRepository.selectByIdAsync(avatar.user_id);
    if (!user) throw new DefaultError('User not found');

    const avatarAlreadyExists = await this.avatarRepository.selectByUserId(avatar.user_id);
    if (avatarAlreadyExists) throw new DefaultError('Usuário já possui um avatar, atualize o mesmo');

    const newAvatar = new UserAvatarEntity(avatar);
    const avatarCreated = await this.avatarRepository.insertAsync(newAvatar);
    return avatarCreated;
  }
}
