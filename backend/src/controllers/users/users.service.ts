import * as passwordHash from 'password-hash';
import { User } from '../../interfaces/user/user.model';
import { UserEntity } from '../../entities/users.entity';
import { UserCreate } from '../../interfaces/user/user-create.model';
import { UserUpdate } from '../../interfaces/user/user-update.model';
import { ConflictException, Injectable } from '@nestjs/common';
import { AppRepositoryService } from '../../repository/app.repository.service';

@Injectable()
export class UsersService {
  public constructor(
    private readonly usersRepository: AppRepositoryService<UserEntity>,
  ) {}

  public async findAll(): Promise<User[]> {
    const users: UserEntity[] = await this.usersRepository.findAll();

    for (const user of users) {
      delete user.hashedPassword;
    }

    return users;
  }

  public async findOne(id: string): Promise<User> {
    const user: UserEntity = await this.usersRepository.findOne(id);
    delete user.hashedPassword;
    return user;
  }

  public async createOne(model: UserCreate): Promise<User> {
    await this.throwIfLoginAlreadyExists(model.login);

    return this.usersRepository.createOne({
      login: model.login,
      hashedPassword: passwordHash.generate(model.plainPassword),
      name: model.name,
      surname: model.surname,
      isAdmin: model.isAdmin,
      isLocked: model.isLocked,
      favouriteBooksIds: model.favouriteBooksIds,
    });
  }

  public async updateOne(id: string, model: UserUpdate): Promise<User> {
    if (model.login) {
      await this.throwIfLoginAlreadyExists(model.login);
    }

    if (model.plainPassword) {
      const hashedPassword: string = passwordHash.generate(model.plainPassword);
      delete model.plainPassword;
      return this.usersRepository.updateOne(id, {
        ...model,
        hashedPassword,
      });
    } else {
      return this.usersRepository.updateOne(id, model);
    }
  }

  public removeOne(id: string): Promise<void> {
    return this.usersRepository.removeOne(id);
  }

  public async throwIfLoginAlreadyExists(login: string): Promise<void> {
    const allUsers: User[] = await this.usersRepository.findAll();
    const loginAlreadyExists: boolean = allUsers.some(
      (user) => user.login === login,
    );
    if (loginAlreadyExists) {
      throw new ConflictException(`User with login ${login} already exists`);
    }
  }
}
