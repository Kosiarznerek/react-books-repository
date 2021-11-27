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
import { UserCreateDto } from '../../models/user/user-create.dto';
import { UserUpdateDto } from '../../models/user/user-update.dto';
import { UserDto } from '../../models/user/user.dto';
import { AdminGuard } from '../../passport/passport.admin';
import { AuthenticatedGuard } from '../../passport/passport.guard';
import { Payload } from '../../passport/passport.param';
import { PassportPayload } from '../../passport/passport.payload';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AuthenticatedGuard, AdminGuard)
  public findAll(): Promise<UserDto[]> {
    return this.usersService.findAll();
  }

  @Get('me')
  @UseGuards(AuthenticatedGuard)
  public findOneByPayload(
    @Payload() payload: PassportPayload,
  ): Promise<UserDto> {
    return this.usersService.findOne(payload.id);
  }

  @Get(':id')
  @UseGuards(AuthenticatedGuard, AdminGuard)
  public findOneById(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.findOne(id);
  }

  @Post()
  @UseGuards(AuthenticatedGuard, AdminGuard)
  public createOne(@Body() model: UserCreateDto): Promise<UserDto> {
    return this.usersService.createOne(model);
  }

  @Patch('me')
  @UseGuards(AuthenticatedGuard)
  public updateOneByPayload(
    @Payload() payload: PassportPayload,
    @Body() model: UserUpdateDto,
  ): Promise<UserDto> {
    return this.usersService.updateOne(payload.id, model);
  }

  @Patch(':id')
  @UseGuards(AuthenticatedGuard, AdminGuard)
  public updateOneById(
    @Param('id') id: string,
    @Body() model: UserUpdateDto,
  ): Promise<UserDto> {
    return this.usersService.updateOne(id, model);
  }

  @Delete('me')
  @UseGuards(AuthenticatedGuard)
  public removeOneByPayload(
    @Payload() payload: PassportPayload,
  ): Promise<void> {
    return this.usersService.removeOne(payload.id);
  }

  @Delete(':id')
  @UseGuards(AuthenticatedGuard, AdminGuard)
  public removeOneById(@Param('id') id: string): Promise<void> {
    return this.usersService.removeOne(id);
  }
}
