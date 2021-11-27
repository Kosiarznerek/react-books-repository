import { IsNotEmpty, IsString } from 'class-validator';
import { UserSignIn } from '../../interfaces/user/user-sign-in.model';

export class UserSignInDto implements UserSignIn {
  @IsString()
  @IsNotEmpty()
  public login: string;

  @IsString()
  @IsNotEmpty()
  public plainPassword: string;
}
