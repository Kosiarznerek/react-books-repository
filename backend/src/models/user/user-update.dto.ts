import { UserUpdate } from '../../interfaces/user/user-update.model';
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserUpdateDto implements UserUpdate {
  @IsString()
  @MinLength(5)
  @IsOptional()
  public login?: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  public plainPassword?: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  public name?: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  public surname?: string;

  @IsBoolean()
  @IsOptional()
  public isAdmin?: boolean;

  @IsBoolean()
  @IsOptional()
  public isLocked?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  public favouriteBooksIds?: string[];
}
