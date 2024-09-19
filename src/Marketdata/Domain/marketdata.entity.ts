import { Instrument } from "@/Instrument/Domain/instrument.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "marketdata" })
export class Marketdata {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Instrument, (instrument) => instrument.marketdata)
  @JoinColumn({ name: "instrumentid" })
  instrument: Instrument;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  high: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  low: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  open: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  close: number;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  previousclose: number;

  @Column()
  date: Date;
}
