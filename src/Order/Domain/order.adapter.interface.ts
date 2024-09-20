import { Order } from "./order.entity";

export interface IOrderAdapter {
  getFilledOrdersByUserId(id: number): Promise<Order[]>;
  createOrder(newOrder: Order): Promise<Order>;
}
