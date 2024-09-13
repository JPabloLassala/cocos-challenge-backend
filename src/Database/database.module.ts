import { IDatabaseConfig } from '@Config';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [ConfigModule],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        SequelizeModule.forRootAsync({
          name: 'default',
          useFactory: (configService: ConfigService) => {
            const dbConfig = configService.get<IDatabaseConfig>('database');
            return {
              dialect: 'postgres',
              host: dbConfig.host,
              port: dbConfig.port,
              username: dbConfig.username,
              password: dbConfig.password,
              database: dbConfig.name,
              models: [],
            };
          },
          inject: [ConfigService],
        }),
      ],
      exports: [SequelizeModule],
    };
  }
}
