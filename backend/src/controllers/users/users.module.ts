import { Module } from '@nestjs/common';
import { AppRepositoryModule } from '../../repository/app.repository.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [AppRepositoryModule.register({ repository: 'users' })],
})
export class UsersModule {}
