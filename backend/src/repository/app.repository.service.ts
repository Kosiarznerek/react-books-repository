import { v4 } from 'uuid';
import { readFile, writeFile } from 'fs/promises';
import { Inject, Injectable } from '@nestjs/common';
import { AppRepositoryModel } from './app.repository.model';
import { AppRepositoryOptions } from './app.repository.options';
import { AppRepositoryOptionsKey } from './app.repository.options.key';

@Injectable()
export class AppRepositoryService<Model extends AppRepositoryModel> {
  public readonly repositoryPath: string;
  private readonly repositoryName: string;

  public constructor(
    @Inject(AppRepositoryOptionsKey) private options: AppRepositoryOptions,
  ) {
    this.repositoryName = this.options.repository;
    this.repositoryPath = `${__dirname}/app.repository.json`;
  }

  public findAll(): Promise<Model[]> {
    return this.readRepository();
  }

  public async findOne(id: string): Promise<Model> {
    const models: Model[] = await this.readRepository();
    return models.find((model) => model.id === id);
  }

  public async createOne(model: Omit<Model, 'id'>): Promise<Model> {
    const models: Model[] = await this.readRepository();
    const create: Model = <Model>Object.assign(model, {
      id: v4(),
    });
    models.push(create);
    await this.setRepository(models);
    return create;
  }

  public async updateOne(
    id: string,
    model: Partial<Omit<Model, 'id'>>,
  ): Promise<Model> {
    const models: Model[] = await this.readRepository();
    const current: Model = models.find((value) => value.id === id);
    Object.assign(current, model);
    await this.setRepository(models);
    return current;
  }

  public async removeOne(id: string): Promise<void> {
    const models: Model[] = await this.readRepository();
    const filtered: Model[] = models.filter((value) => value.id !== id);
    await this.setRepository(filtered);
  }

  private async readRepository(): Promise<Model[]> {
    const database: Object = await this.readDatabase();
    return database[this.repositoryName] ?? [];
  }

  private async setRepository(data: Model[]): Promise<void> {
    const database: Object = await this.readDatabase();
    database[this.repositoryName] = data;
    await this.setDatabase(database);
  }

  private async readDatabase(): Promise<Object> {
    const databaseBuffer: Buffer = await readFile(this.repositoryPath);
    return JSON.parse(databaseBuffer.toString());
  }

  private async setDatabase(data: Object): Promise<void> {
    const databaseString: string = JSON.stringify(data);
    await writeFile(this.repositoryPath, databaseString);
  }
}
