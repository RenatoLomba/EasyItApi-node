import multer, {
  StorageEngine, Options, FileFilterCallback, ErrorCode,
} from 'multer';
import { resolve } from 'path';
import { Request } from 'express';

class MulterConfig implements Options {
  readonly storage: StorageEngine;

  readonly fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => void;

  constructor() {
    this.fileFilter = (req, file, cb) => {
      if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
        return cb(new multer.MulterError(
          'LIMIT_UNEXPECTED_FILE' as ErrorCode,
          'Invalid File, must be png or jpeg',
        ));
      }

      return cb(null, true);
    };
    this.storage = multer.diskStorage({
      destination(req, file, cb) {
        cb(null, resolve('uploads', 'images'));
      },
      filename(req, file, cb) {
        const rand = Math.floor(Math.random() * (1000 - 1) + 1);
        const name = `easyIt-${rand}-${Date.now()}-${file.originalname}`;
        cb(null, name);
      },
    });
  }
}
const multerConfig = new MulterConfig();
const uploader = multer(multerConfig);
export { uploader };
