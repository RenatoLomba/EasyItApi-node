import { Request, Response } from 'express';
import fs from 'fs';
import { IUploadUserAvatarUseCase } from '../../usecases/IUploadUserAvatarUseCase';
import { UserAvatarResult } from '../dtos/avatar/UserAvatarResult';
import { DefaultError } from '../errors/DefaultError';

export class UserAvatarController {
  constructor(
    private uploadAvatarUseCase: IUploadUserAvatarUseCase,
  ) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { userId } = req.body;
    if (!userId) throw new DefaultError('Campo Id do Usuário não informado');

    const avatarSended = fs.readFileSync(req.file.path);
    const encodedImage = avatarSended.toString('base64');

    const avatar = await this.uploadAvatarUseCase.execute({
      content_type: req.file.mimetype,
      user_id: userId,
      image: Buffer.from(encodedImage, 'base64'),
      original_name: req.file.originalname,
      file_name: req.file.filename,
    });
    const avatarResult = new UserAvatarResult(avatar);

    return res.status(200).json(avatarResult);
  }
}
