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
  high: string;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  low: string;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  open: string;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  close: string;

  @Column({ type: "numeric", precision: 10, scale: 2 })
  previousclose: string;

  @Column({ type: "date" })
  date: Date;
}
