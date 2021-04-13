import { Request, Response } from 'express';
import fs from 'fs';

export class ThumbnailsController {
  async create(req: Request, res: Response): Promise<Response> {
    const thumbSended = fs.readFileSync(req.file.path);
    const encodedImage = thumbSended.toString('base64');
    const buffer = Buffer.from(encodedImage, 'base64');
    const thumbnail = {
      contentType: req.file.mimetype,
      originalName: req.file.originalname,
      image: buffer.toJSON().data,
    };
    return res.status(200).json(thumbnail);
  }
}
