import { Instrument } from "./instrument.entity";

export interface IInstrumentAdapter {
  getInstrumentsByNameOrTicker(name?: string, ticker?: string): Promise<Instrument[]>;
  getInstrumentByTicker(ticker: string): Promise<Instrument>;
  getInstrumentById(id: number): Promise<Instrument>;
}
