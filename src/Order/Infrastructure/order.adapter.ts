import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Order } from "../Domain/order.entity";
import { DataSource, Repository } from "typeorm";
import { IOrderAdapter, OrderStatuses } from "@/Order/Domain";
import { InstrumentTypes } from "@/Instrument";

@Injectable()
export class OrderAdapter implements IOrderAdapter {
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async getFilledOrdersByUserId(userId: number): Promise<Order[]> {
    return this.dataSource
      .createQueryBuilder(Order, "order")
      .leftJoin("order.user", "user")
      .leftJoinAndSelect("order.instrument", "instrument")
      .where("order.userid = :userId", { userId })
      .andWhere("status = :status", { status: OrderStatuses.Filled })
      .orderBy("order.datetime", "DESC")
      .getMany();
  }

  async getShareOrders(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId }, instrument: { type: InstrumentTypes.Shares } },
      relations: ["instrument"],
    });
  }

  async createOrder(newOrder: Order): Promise<Order> {
    return this.orderRepository.save(newOrder);
  }
}
