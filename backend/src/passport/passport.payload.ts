import { User } from '../interfaces/user/user.model';

export interface PassportPayload extends User {
  iat: number;
  exp: number;
}
