import { Book } from '../interfaces/book/book.model';

export class BookEntity implements Book {
  public id: string;
  public title: string;
  public author: string;
  public coverUrl: string;
  public description: string;
}
