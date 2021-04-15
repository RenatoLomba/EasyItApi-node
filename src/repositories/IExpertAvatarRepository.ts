import { ExpertAvatarEntity } from '../entities/ExpertAvatarEntity';

export interface IExpertAvatarRepository {
  insertAsync(avatar: ExpertAvatarEntity): Promise<ExpertAvatarEntity>;
  selectByExpertId(id: string): Promise<ExpertAvatarEntity>;
}
