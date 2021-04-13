import multer from 'multer';
import { resolve } from 'path';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, resolve(__dirname, '..', '..', '..', 'uploads', 'images'));
  },
  filename(req, file, cb) {
    const rand = Math.floor(Math.random() * (1000 - 1) + 1);
    const date = new Date();
    const name = `easyIt_${rand}_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${file.originalname}`;
    cb(null, name);
  },
});

export const upload = multer({ storage });
