import { UserAvatarEntity } from '../entities/UserAvatarEntity';
import { IAvatarDTO } from './dtos/IAvatarDTO';

export interface IUploadUserAvatarUseCase {
  execute(avatar: IAvatarDTO): Promise<UserAvatarEntity>;
}
