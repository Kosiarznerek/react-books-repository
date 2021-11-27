import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { UserSignInDto } from '../../models/user/user-sign-in.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post()
  public signIn(@Body() model: UserSignInDto): Promise<string> {
    return this.authService.signIn(model);
  }
}
