import crypto from 'node:crypto';

import path from 'node:path';

import multer from 'fastify-multer';
import { StorageEngine } from 'fastify-multer/lib/interfaces';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  tmpFolder: string;
  petsFolder: string;

  multer: {
    storage: StorageEngine;
  };
}

export default {
  tmpFolder,
  petsFolder: 'pets',

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },
} as IUploadConfig;
