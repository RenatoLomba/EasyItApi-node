import { UserAvatarEntity } from '../entities/UserAvatarEntity';

export interface IUserAvatarRepository {
  insertAsync(avatar: UserAvatarEntity): Promise<UserAvatarEntity>;
  selectByUserId(id: string): Promise<UserAvatarEntity>;
}
