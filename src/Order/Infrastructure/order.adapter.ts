import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../Domain/order.entity";
import { Repository } from "typeorm";
import { IOrderAdapter, OrderStatuses } from "@/Order/Domain";
import { InstrumentTypes } from "@/Instrument";
// import { Instrument } from "@/Instrument/Domain/instrument.entity";
// import { User } from "@/User/Domain/user.entity";

@Injectable()
export class OrderAdapter implements IOrderAdapter {
  constructor(@InjectRepository(Order) private readonly orderRepository: Repository<Order>) {}

  async getFilledOrdersByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId }, status: OrderStatuses.Filled },
      relations: ["instrument"],
    });
  }

  async getShareOrders(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId }, instrument: { type: InstrumentTypes.Shares } },
      relations: ["instrument"],
    });
  }

  // async createOrder(newOrder: Partial<Order>, instrument: Instrument, user: User): Promise<Order> {
  //   const order: Order = {
  //     user: newOrder.user.id,
  //   };
  //   return this.orderRepository.save(newOrder);
  // }
}
