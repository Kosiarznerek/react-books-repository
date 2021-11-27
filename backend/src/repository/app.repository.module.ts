import { DynamicModule, Module } from '@nestjs/common';
import { AppRepositoryOptions } from './app.repository.options';
import { AppRepositoryOptionsKey } from './app.repository.options.key';
import { AppRepositoryService } from './app.repository.service';

@Module({})
export class AppRepositoryModule {
  public static register(options: AppRepositoryOptions): DynamicModule {
    return {
      module: AppRepositoryModule,
      providers: [
        {
          useValue: options,
          provide: AppRepositoryOptionsKey,
        },
        AppRepositoryService,
      ],
      exports: [AppRepositoryService],
    };
  }
}
