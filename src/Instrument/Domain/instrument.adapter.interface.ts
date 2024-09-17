import { Instrument } from "./instrument.entity";

export interface IInstrumentAdapter {
  findInstrumentById(id: number): Promise<Instrument>;
}
