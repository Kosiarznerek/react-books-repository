import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportSecret } from './passport.secret';
import { PassportPayload } from './passport.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: passportSecret,
    });
  }

  public validate(payload: PassportPayload): PassportPayload {
    return payload;
  }
}
