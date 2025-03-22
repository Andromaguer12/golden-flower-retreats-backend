/* eslint-disable @typescript-eslint/no-explicit-any */
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import configs from '../config/constants/constants-config';
import userRepository from '../shared/repositories/usersRepository';
import { UserTokenPayload } from '../typesDefs/models/users/types';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: configs().jwtSecret,
};

export default new Strategy(options, async (payload: UserTokenPayload, done: (validated: boolean) => void) => {
  try {
    const exists = await userRepository.getUserByEmail(payload?.email);
    if (exists) {
      return done(true);
    } else {
      done(false);
      throw new Error('INVALID-AUTHORIZATION');
    }
  } catch (error) {
    throw new Error(error as string);
  }
});
