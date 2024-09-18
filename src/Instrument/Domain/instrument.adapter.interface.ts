import { Instrument } from "./instrument.entity";

export interface IInstrumentAdapter {
  getInstrumentByNameOrTicker(name?: string, ticker?: string): Promise<Instrument[]>;
}
