import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderSides, OrderStatuses, OrderTypes } from "./order.constants";
import { User } from "@/User/Domain/user.entity";
import { Instrument } from "@/Instrument/Domain/instrument.entity";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Instrument, (instrument) => instrument.orders)
  @JoinColumn({ name: "instrumentid" })
  instrument: Instrument;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: "userid" })
  user: User;

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
