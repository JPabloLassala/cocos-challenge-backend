import { Instrument } from "@Instrument/Domain/instrument.entity";
import { SelectQueryBuilder } from "typeorm";

export class InstrumentQuery {
  static byName(qb: SelectQueryBuilder<Instrument>, name: string): SelectQueryBuilder<Instrument> {
    return qb.andWhere("LOWER(instruments.name) LIKE :name", { name: `%${name.toLowerCase()}%` });
  }

  static byTicker(qb: SelectQueryBuilder<Instrument>, ticker: string): SelectQueryBuilder<Instrument> {
    return qb.andWhere("LOWER(instruments.ticker) LIKE :ticker", { ticker: `%${ticker.toLowerCase()}%` });
  }
}
