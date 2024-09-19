import { Module } from "@nestjs/common";
import { MarketdataService } from "../Domain/marketdata.service";
import { MarketdataAdapter } from "./marketdata.adapter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Marketdata } from "../Domain/marketdata.entity";
import { Adapters } from "@/Utils";

@Module({
  imports: [TypeOrmModule.forFeature([Marketdata])],
  controllers: [],
  providers: [
    MarketdataService,
    {
      provide: Adapters.Marketdata,
      useClass: MarketdataAdapter,
    },
  ],
  exports: [Adapters.Marketdata],
})
export class MarketdataModule {}
