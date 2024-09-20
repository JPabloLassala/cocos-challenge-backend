import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
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

  @ManyToOne(() => User, (user) => user.orders, { eager: true })
  @JoinColumn({ name: "userid" })
  user: User;

  @Column({ type: "int" })
  size: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  price: number;

  @Column({ type: "varchar", length: 10 })
  type: OrderTypes.Market | OrderTypes.Limit;

  @Column({ type: "varchar", length: 10 })
  side: OrderSides.Buy | OrderSides.Sell | OrderSides.CashIn | OrderSides.CashOut;

  @Column({ type: "varchar", length: 10 })
  status:
    | OrderStatuses.New
    | OrderStatuses.Filled
    | OrderStatuses.Rejected
    | OrderStatuses.Cancelled;

  @CreateDateColumn({ type: "timestamp" })
  datetime: Date;
}
