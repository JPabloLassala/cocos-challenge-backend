import { Module } from "@nestjs/common";
import { Adapters } from "@/Utils";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Instrument } from "../Domain/instrument.entity";
import { InstrumentAdapter } from "./instrument.adapter";

@Module({
  imports: [TypeOrmModule.forFeature([Instrument])],
  controllers: [],
  providers: [{ provide: Adapters.Instrument, useClass: InstrumentAdapter }],
  exports: [Adapters.Instrument],
})
export class InstrumentModule {}
