import { appConfig, databaseConfig } from "@Config";
import { DatabaseModule } from "@Database";
import { MarketdataModule } from "@Marketdata";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { UserModule } from "@User";
import { AllExceptionsFilter } from "@Utils";
import { validate } from "class-validator";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { InstrumentModule } from "@Instrument";
import { OrderModule } from "@Order";
import { PortfolioModule } from "@Portfolio/Infrastructure";
import { AssetModule } from "@Asset";

@Module({
  imports: [
    AssetModule,
    UserModule,
    InstrumentModule,
    OrderModule,
    MarketdataModule,
    PortfolioModule,
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      isGlobal: true,
      validate: validate,
      ignoreEnvFile: process.env.IGNORE_ENV_FILE === "true",
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
