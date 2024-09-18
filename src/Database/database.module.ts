import { IDatabaseConfig } from "@/Config";
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/Config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Instrument } from "@/Instrument/Domain/instrument.entity";
import { Order } from "@/Order/Domain/order.entity";
import { User } from "@/User/Domain/user.entity";
import { Marketdata } from "@/Marketdata/Domain/marketdata.entity";

@Module({
  imports: [ConfigModule],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRootAsync({
          name: "default",
          useFactory: (configService: ConfigService) => {
            const dbConfig = configService.get<IDatabaseConfig>("database");
            return {
              type: "postgres",
              host: dbConfig.host,
              port: dbConfig.port,
              username: dbConfig.username,
              password: dbConfig.password,
              database: dbConfig.name,
              entities: [User, Order, Instrument, Marketdata],
              logging: true,
            };
          },
          inject: [ConfigService],
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
