import { Order } from "./order.entity";

export interface IOrderAdapter {
  findOrdersWithInstrumentsByUserId(id: number): Promise<Order[]>;
}
