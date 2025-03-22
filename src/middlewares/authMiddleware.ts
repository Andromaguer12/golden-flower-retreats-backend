/* eslint-disable @typescript-eslint/no-explicit-any */
import asyncHandler from 'express-async-handler';
import userRepository from '../shared/repositories/usersRepository';
import Encryptation from '../utils/encryptation/encryptation';
import { UserDocument, UserTokenPayload } from '../typesDefs/models/users/types';
import configs from '../config/constants/constants-config';
import { UserLevelsPermissions } from '../typesDefs/models/users/enum';
import { EncryptationMethods } from '../typesDefs/utils/encryptation/enums';
import { NextFunction, Request, Response } from 'express';
import usersRepository from '../shared/repositories/usersRepository';

interface CustomRequest extends Request {
  body: any;
  params: any;
  files: any[];
  user?: Partial<UserDocument>;
  token?: string;
  headers: {
    authorization?: string | any;
    contentType?: string | any;
  };
}

interface CustomResponse extends Response {
  status: (code: number) => any;
  json: (res: any) => any;
}

const tokenEncryptation = new Encryptation(EncryptationMethods.JWT, { saltGenerationNumber: 10 });

export const protect = asyncHandler(async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded: Partial<UserTokenPayload> | 'expired' | null = await tokenEncryptation.validateToken(token);

      if (decoded === 'expired') {
        res.status(401);
        throw new Error('NO_AUTHORIZED_INVALID_TOKEN');
      }

      if (!decoded) {
        res.status(401);
        throw new Error('INVALID_TOKEN');
      }

      if (!(decoded?.tokenDomain === configs().MONGODB.CURRENT_VALIDATED_DOMAIN)) {
        res.status(401);
        throw new Error('INVALID_TOKEN_DOMAIN');
      }

      const user = await userRepository.getUserById(decoded?._id);

      if (user) {
        req.user = user as Partial<UserDocument>;
        req.token = token || null;
      }

      next();
    } catch (error) {
      res.status(401);
      throw new Error(error?.message || 'INVALID_TOKEN');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('INVALID_TOKEN');
  }
});

export const forEditor = asyncHandler(async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
  const user: any = await usersRepository.getUserByEmail(req.user.email);

  if (req.user && user.permissions === UserLevelsPermissions.Admin) {
    next();
  } else {
    res.status(401);
    throw new Error('NO_AUTHORIZED');
  }
});
