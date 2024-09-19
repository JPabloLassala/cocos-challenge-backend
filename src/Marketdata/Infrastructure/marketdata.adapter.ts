import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Marketdata } from "../Domain/marketdata.entity";
import { IMarketdataAdapter } from "../Domain";

@Injectable()
export class MarketdataAdapter implements IMarketdataAdapter {
  constructor(@InjectRepository(Marketdata) private readonly repository: Repository<Marketdata>) {}

  async findMarketDataByInstrumentId(id: number): Promise<Marketdata> {
    return this.repository.findOneBy({ instrument: { id } });
  }
}
