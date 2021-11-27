import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BookCreateDto } from '../../models/book/book-create.dto';
import { BookUpdateDto } from '../../models/book/book-update.dto';
import { BookDto } from '../../models/book/book.dto';
import { AdminGuard } from '../../passport/passport.admin';
import { AuthenticatedGuard } from '../../passport/passport.guard';
import { BooksService } from './books.service';

@ApiTags('books')
@Controller('books')
export class BooksController {
  public constructor(private readonly booksService: BooksService) {}

  @Get()
  public findAll(): Promise<BookDto[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<BookDto> {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, AdminGuard)
  public createOne(@Body() model: BookCreateDto): Promise<BookDto> {
    return this.booksService.createOne(model);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, AdminGuard)
  public updateOne(
    @Param('id') id: string,
    @Body() model: BookUpdateDto,
  ): Promise<BookDto> {
    return this.booksService.updateOne(id, model);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, AdminGuard)
  public removeOne(@Param('id') id: string): Promise<void> {
    return this.booksService.removeOne(id);
  }
}
