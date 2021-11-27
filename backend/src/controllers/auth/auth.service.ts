import * as passwordHash from 'password-hash';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserSignIn } from '../../interfaces/user/user-sign-in.model';
import { UserEntity } from '../../entities/users.entity';
import { AppRepositoryService } from '../../repository/app.repository.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly usersRepository: AppRepositoryService<UserEntity>,
  ) {}

  public async findUserByLogin(login: string): Promise<UserEntity> {
    const users: UserEntity[] = await this.usersRepository.findAll();
    return users.find((user) => user.login === login);
  }

  public async signIn(options: UserSignIn): Promise<string> {
    const user: UserEntity = await this.findUserByLogin(options.login);
    if (!user) {
      throw new UnauthorizedException();
    }

    if (user.isLocked) {
      throw new ForbiddenException('Your account has been locked');
    }

    const passwordMatch: boolean = passwordHash.verify(
      options.plainPassword,
      user.hashedPassword,
    );
    if (!passwordMatch) {
      throw new UnauthorizedException();
    }

    delete user.hashedPassword;

    return this.jwtService.sign(user);
  }
}
