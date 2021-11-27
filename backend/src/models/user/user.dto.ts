import { User } from '../../interfaces/user/user.model';

export class UserDto implements User {
  public id: string;
  public login: string;
  public name: string;
  public surname: string;
  public isAdmin: boolean;
  public isLocked: boolean;
  public favouriteBooksIds: string[];
}
