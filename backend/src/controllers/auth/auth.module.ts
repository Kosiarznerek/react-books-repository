import { Module } from '@nestjs/common';
import { JwtModule } from '../../passport/passport.module';
import { AppRepositoryModule } from '../../repository/app.repository.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule, AppRepositoryModule.register({ repository: 'users' })],
})
export class AuthModule {}
