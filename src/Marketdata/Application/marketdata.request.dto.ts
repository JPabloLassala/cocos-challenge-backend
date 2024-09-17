import { MarketdataDTO } from "@Marketdata/Infrastructure";
import { Type } from "class-transformer";

export class FindMarketDataResponseDTO {
  @Type(() => MarketdataDTO)
  marketData: MarketdataDTO[];
}

export class FindMarketDataRequestDTO {
  byName: string;
  byTicker: string;
}
