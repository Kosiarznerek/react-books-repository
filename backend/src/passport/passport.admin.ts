import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { PassportPayload } from './passport.payload';

@Injectable()
export class AdminGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const payload: PassportPayload = request.user;
    return payload?.isAdmin;
  }
}
