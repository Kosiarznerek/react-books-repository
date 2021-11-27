import { Module } from '@nestjs/common';
import { AuthModule } from './controllers/auth/auth.module';
import { BooksModule } from './controllers/books/books.module';
import { UsersModule } from './controllers/users/users.module';
import { JwtStrategy } from './passport/passport.stategy';

@Module({
  imports: [AuthModule, BooksModule, UsersModule, JwtStrategy],
})
export class AppModule {}
