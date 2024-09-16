import { Instrument } from "@Instrument";
import { User } from "@User";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OrderSides, OrderStatuses, OrderTypes } from "./order.constants";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column(() => Instrument)
  instrumentId: number;

  @Column(() => User)
  userId: number;

  @Column()
  size: number;

  @Column()
  price: number;

  @Column()
  type: OrderTypes.Market | OrderTypes.Limit;

  @Column()
  side: OrderSides.Buy | OrderSides.Sell | OrderSides.CashIn | OrderSides.CashOut;

  @Column()
  status: OrderStatuses.New | OrderStatuses.Filled | OrderStatuses.Rejected | OrderStatuses.Cancelled;

  @Column()
  datetime: Date;
}
