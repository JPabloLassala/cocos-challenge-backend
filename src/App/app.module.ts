import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/Config";
import { APP_FILTER } from "@nestjs/core";
import { validate } from "class-validator";
import { AssetModule } from "@/Asset";
import { OrderModule } from "@/Order";
import { PortfolioModule } from "@/Portfolio";
import { appConfig, databaseConfig } from "@/Config";
import { DatabaseModule } from "@/Database";
import { AllExceptionsFilter } from "@/Utils";

@Module({
  imports: [
    AssetModule,
    OrderModule,
    PortfolioModule,
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig],
      isGlobal: true,
      validate: validate,
      ignoreEnvFile: process.env.IGNORE_ENV_FILE === "true",
    }),
    DatabaseModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
