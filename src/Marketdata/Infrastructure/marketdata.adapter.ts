import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Marketdata } from "../Domain/marketdata.entity";
import { IMarketdataAdapter } from "../Domain";

@Injectable()
export class MarketdataAdapter implements IMarketdataAdapter {
  constructor(@InjectRepository(Marketdata) private readonly repository: Repository<Marketdata>) {}

  async findMarketDataByInstrumentId(id: number): Promise<Marketdata> {
    return this.repository.findOneBy({ instrument: { id } });
  }

  async findMarketDataByInstrumentIds(ids: number[]): Promise<Marketdata[]> {
    return this.repository.find({
      where: { instrument: { id: In(ids) } },
      relations: ["instrument"],
      order: { date: "DESC" },
    });
  }
}
