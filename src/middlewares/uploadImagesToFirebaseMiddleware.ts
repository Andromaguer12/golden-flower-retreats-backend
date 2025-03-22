/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { UserDocument } from '../typesDefs/models/users/types';
import fs from 'fs';
import { uploadImage } from '../config/firebase/utils/firebaseUtils';

interface CustomRequest extends Request {
  user: UserDocument;
  files: any;
}

export const uploadToFirebaseMiddleware = (filesLocalLocation: string) =>
  asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
    if (filesLocalLocation) {
      const filesKeysAndBlob = [];

      for await (const key of Object.keys(req.files)) {
        const payloadFiles = [];

        for await (const file of req.files[key]) {
          const buffer = fs.readFileSync(file.path);

          const base64 = buffer.toString('base64');

          const fileUrl: any = await uploadImage(base64, 'app/main/storage', file.originalname);

          payloadFiles.push({
            filename: fileUrl.url ?? '',
            originalname: file.originalname,
          });
        }

        const payload = {
          [key]: payloadFiles,
        };

        filesKeysAndBlob.push(payload);
      }

      Object.keys(req.files).forEach((key) => {
        req.files[key] = filesKeysAndBlob.find((field) => Boolean(field[key]))[key];
      });

      next();
    } else {
      res.status(401);
      throw new Error('filesLocalLocation-required');
    }
  });
