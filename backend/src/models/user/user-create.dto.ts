import { IsArray, IsBoolean, IsString, MinLength } from 'class-validator';
import { UserCreate } from '../../interfaces/user/user-create.model';

export class UserCreateDto implements UserCreate {
  @IsString()
  @MinLength(5)
  public login: string;

  @IsString()
  @MinLength(5)
  public plainPassword: string;

  @IsString()
  @MinLength(5)
  public name: string;

  @IsString()
  @MinLength(5)
  public surname: string;

  @IsBoolean()
  public isAdmin: boolean;

  @IsBoolean()
  public isLocked: boolean;

  @IsArray()
  @IsString({ each: true })
  public favouriteBooksIds: string[];
}
