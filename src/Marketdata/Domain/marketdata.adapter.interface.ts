import { Marketdata } from "./marketdata.entity";

export interface IMarketdataAdapter {
  findMarketDataByInstrumentId(id: number): Promise<Marketdata>;
  findMarketDataByInstrumentIds(ids: number[]): Promise<Marketdata[]>;
}
