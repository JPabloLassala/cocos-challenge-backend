import { Module } from "@nestjs/common";
import { MarketdataService } from "../Domain/marketdata.service";
import { MarketdataAdapter } from "./marketdata.adapter";

@Module({
  imports: [],
  controllers: [],
  providers: [MarketdataService, MarketdataAdapter],
})
export class MarketdataModule {}
