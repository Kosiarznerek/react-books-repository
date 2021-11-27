import { JwtModule as Module } from '@nestjs/jwt';
import { passportSecret } from './passport.secret';

export const JwtModule = Module.register({
  secret: passportSecret,
  signOptions: {
    expiresIn: '24h',
  },
});
