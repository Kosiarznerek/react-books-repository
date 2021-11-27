import { Injectable } from '@nestjs/common';
import { BookCreate } from '../../interfaces/book/book-create.model';
import { BookUpdate } from '../../interfaces/book/book-update.model';
import { Book } from '../../interfaces/book/book.model';
import { BookEntity } from '../../entities/books.entity';
import { AppRepositoryService } from '../../repository/app.repository.service';

@Injectable()
export class BooksService {
  public constructor(
    private readonly booksRepository: AppRepositoryService<BookEntity>,
  ) {}

  public findAll(): Promise<Book[]> {
    return this.booksRepository.findAll();
  }

  public findOne(id: string): Promise<Book> {
    return this.booksRepository.findOne(id);
  }

  public createOne(model: BookCreate): Promise<Book> {
    return this.booksRepository.createOne(model);
  }

  public updateOne(id: string, model: BookUpdate): Promise<Book> {
    return this.booksRepository.updateOne(id, model);
  }

  public removeOne(id: string): Promise<void> {
    return this.booksRepository.removeOne(id);
  }
}
