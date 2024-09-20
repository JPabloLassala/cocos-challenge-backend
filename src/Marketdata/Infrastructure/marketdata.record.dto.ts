import { Exclude } from "class-transformer";

export class MarketdataDTO {
  @Exclude()
  id: number;
  instrumentId: number;
  userId: number;
  size: number;
  price: number;
  type: string;
  side: string;
  status: string;
  datetime: string;
}
