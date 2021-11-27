import { IsString, IsUrl, MinLength } from 'class-validator';
import { BookCreate } from '../../interfaces/book/book-create.model';

export class BookCreateDto implements BookCreate {
  @IsString()
  @MinLength(5)
  public title: string;

  @IsString()
  @MinLength(5)
  public author: string;

  @IsUrl()
  public coverUrl: string;

  @IsString()
  @MinLength(10)
  public description: string;
}
