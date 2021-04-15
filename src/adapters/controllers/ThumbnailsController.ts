import { Request, Response } from 'express';
import fs from 'fs';
import { IUploadThumbnailUseCase } from '../../usecases/IUploadThumbnailUseCase';
import { ThumbnailResult } from '../dtos/thumbnail/ThumnailResult';
import { DefaultError } from '../errors/DefaultError';

export class ThumbnailsController {
  constructor(
    private uploadThumbnailUseCase: IUploadThumbnailUseCase,
  ) {
    this.create = this.create.bind(this);
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { expertId } = req.body;
    if (!expertId) throw new DefaultError('Campo Id do Expert não foi informado');

    const thumbSended = fs.readFileSync(req.file.path);
    const encodedImage = thumbSended.toString('base64');

    const thumbnail = await this.uploadThumbnailUseCase.execute({
      content_type: req.file.mimetype,
      expert_id: expertId,
      image: Buffer.from(encodedImage, 'base64'),
      original_name: req.file.originalname,
    });
    const thumbnailResult = new ThumbnailResult(thumbnail);
    fs.rmSync(req.file.path);
    return res.status(200).json(thumbnailResult);
  }
}
