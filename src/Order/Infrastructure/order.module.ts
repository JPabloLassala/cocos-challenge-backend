import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderService } from "@/Order/Domain";
import { Order } from "@/Order/Domain/order.entity";
import { Adapters } from "@/Utils";
import { OrderAdapter } from "./order.adapter";

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
  controllers: [],
  providers: [OrderService, { provide: Adapters.Order, useClass: OrderAdapter }],
  exports: [Adapters.Order],
})
export class OrderModule {}
