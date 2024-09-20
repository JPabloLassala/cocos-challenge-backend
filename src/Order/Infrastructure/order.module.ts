import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderService } from "@/Order/Domain";
import { Order } from "@/Order/Domain/order.entity";
import { Adapters } from "@/Utils";
import { OrderAdapter } from "./order.adapter";
import { InstrumentModule } from "@/Instrument";
import { UserModule } from "@/User";
import { MarketdataModule } from "@/Marketdata";
import { OrderController } from "../Application";

@Module({
  imports: [TypeOrmModule.forFeature([Order]), InstrumentModule, UserModule, MarketdataModule],
  controllers: [OrderController],
  providers: [OrderService, { provide: Adapters.Order, useClass: OrderAdapter }],
  exports: [Adapters.Order],
})
export class OrderModule {}
