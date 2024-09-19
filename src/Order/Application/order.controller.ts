import { Body, Controller, Post } from "@nestjs/common";
import { OrderService } from "../Domain";
import { CreateOrderDTO } from "./order.request.dto";

@Controller("order")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() order: CreateOrderDTO) {
    const { assetTicker, userId, initialInvestment, ...newOrder } = order;

    return this.orderService.createOrder(newOrder, assetTicker, userId, initialInvestment);
  }
}
