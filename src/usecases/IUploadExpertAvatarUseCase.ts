import { ExpertAvatarEntity } from '../entities/ExpertAvatarEntity';
import { IExpertAvatarDTO } from './dtos/IExpertAvatarDTO';

export interface IUploadExpertAvatarUseCase {
  execute(avatar: IExpertAvatarDTO): Promise<ExpertAvatarEntity>;
}
