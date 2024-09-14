import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { appConfig, databaseConfig, validate } from '@Config';
import { DatabaseModule } from '@Database';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@Utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      isGlobal: true,
      validate: validate,
      ignoreEnvFile: process.env.IGNORE_ENV_FILE === 'true',
    }),
    DatabaseModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
