import { Instrument } from "@Instrument";
import { User } from "@User";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Marketdata {
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
  type: string;

  @Column()
  side: string;

  @Column()
  status: string;

  @Column()
  datetime: Date;
}
