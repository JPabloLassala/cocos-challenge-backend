import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { InstrumentQuery } from "./instrument.query";
import { plainToInstance } from "class-transformer";
import { IInstrumentAdapter } from "@/Instrument/Domain";
import { Instrument } from "@/Instrument/Domain/instrument.entity";

@Injectable()
export class InstrumentAdapter implements IInstrumentAdapter {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async getInstrumentByNameOrTicker(name?: string, ticker?: string): Promise<Instrument[]> {
    let qb = this.dataSource.getRepository(Instrument).createQueryBuilder("instruments");

    if (name) {
      qb = InstrumentQuery.byName(qb, name);
    }

    if (ticker) {
      qb = InstrumentQuery.byTicker(qb, ticker);
    }

    const result = await qb.getMany();

    return plainToInstance(Instrument, result);
  }
}
