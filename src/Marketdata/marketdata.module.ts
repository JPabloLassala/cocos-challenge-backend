import { Module } from "@nestjs/common";
import { MarketdataController } from "./marketdata.controller";
import { MarketdataService } from "./marketdata.service";
import { MarketdataAdapter } from "./marketdata.adapter";

@Module({
  imports: [],
  controllers: [MarketdataController],
  providers: [MarketdataService, MarketdataAdapter],
})
export class MarketdataModule {}
