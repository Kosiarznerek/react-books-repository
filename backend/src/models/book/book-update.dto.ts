import { BookUpdate } from '../../interfaces/book/book-update.model';
import { IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class BookUpdateDto implements BookUpdate {
  @IsString()
  @MinLength(5)
  @IsOptional()
  public title?: string;

  @IsString()
  @MinLength(5)
  @IsOptional()
  public author?: string;

  @IsUrl()
  @IsOptional()
  public coverUrl?: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  public description?: string;
}
