import { IInstrumentAdapter } from "@Instrument/Domain";
import { Instrument } from "@Instrument/Domain/instrument.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class InstrumentAdapter implements IInstrumentAdapter {
  constructor(@InjectRepository(Instrument) private readonly instrumentRepository: Repository<Instrument>) {}

  findInstrumentById(id: number): Promise<Instrument> {
    return this.instrumentRepository.findOneBy({ id });
  }
}
