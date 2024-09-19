import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { InstrumentQuery } from "./instrument.query";
import { plainToInstance } from "class-transformer";
import { IInstrumentAdapter } from "@/Instrument/Domain";
import { Instrument } from "@/Instrument/Domain/instrument.entity";

@Injectable()
export class InstrumentAdapter implements IInstrumentAdapter {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(Instrument) private readonly instrumentRepository: Repository<Instrument>,
  ) {}

  async getInstrumentsByNameOrTicker(name?: string, ticker?: string): Promise<Instrument[]> {
    let qb = this.dataSource.getRepository(Instrument).createQueryBuilder("instruments");

    if (name) {
      qb = InstrumentQuery.likeName(qb, name);
    }

    if (ticker) {
      qb = InstrumentQuery.likeTicker(qb, ticker);
    }

    return plainToInstance(Instrument, await qb.getMany());
  }

  async getInstrumentByTicker(ticker: string): Promise<Instrument> {
    let qb = this.dataSource.getRepository(Instrument).createQueryBuilder("instruments");
    qb = InstrumentQuery.equalsTicker(qb, ticker);

    return plainToInstance(Instrument, await qb.getOne());
  }

  async getInstrumentById(id: number): Promise<Instrument> {
    const result = await this.instrumentRepository.findOneBy({ id });

    return plainToInstance(Instrument, result);
  }
}
