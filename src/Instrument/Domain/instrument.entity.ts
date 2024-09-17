import { Marketdata } from "@Marketdata/Domain/marketdata.entity";
import { Order } from "@Order/Domain/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "instruments" })
export class Instrument {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 10 })
  ticker: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 10 })
  type: string;

  @OneToMany(() => Order, (order) => order.instrument)
  orders: Order[];

  @OneToMany(() => Marketdata, (marketdata) => marketdata.instrument)
  marketdata: Marketdata[];
}
