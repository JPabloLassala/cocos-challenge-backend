import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { OrderAdapter } from "./order.adapter";

@Module({
  imports: [],
  controllers: [OrderController],
  providers: [OrderService, OrderAdapter],
})
export class OrderModule {}
