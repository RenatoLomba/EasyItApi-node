import { Request, Response } from 'express';
import fs from 'fs';
import { IUploadExpertAvatarUseCase } from '../../usecases/IUploadExpertAvatarUseCase';
import { ExpertAvatarResult } from '../dtos/avatar/ExpertAvatarResult';
import { DefaultError } from '../errors/DefaultError';

export class ExpertAvatarController {
  constructor(
    private uploadExpertAvatarUseCase: IUploadExpertAvatarUseCase,
  ) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { expertId } = req.body;
    if (!expertId) throw new DefaultError('Id do Expert não foi informado');

    const avatarSended = fs.readFileSync(req.file.path);
    const encodedImage = avatarSended.toString('base64');

    const avatar = await this.uploadExpertAvatarUseCase.execute({
      content_type: req.file.mimetype,
      expert_id: expertId,
      image: Buffer.from(encodedImage, 'base64'),
      original_name: req.file.originalname,
      file_name: req.file.filename,
    });
    const avatarResult = new ExpertAvatarResult(avatar);
    return res.status(201).json(avatarResult);
  }
}
