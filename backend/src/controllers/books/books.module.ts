import { Module } from '@nestjs/common';
import { AppRepositoryModule } from '../../repository/app.repository.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService],
  imports: [AppRepositoryModule.register({ repository: 'books' })],
})
export class BooksModule {}
