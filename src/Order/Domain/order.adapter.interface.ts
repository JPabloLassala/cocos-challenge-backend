import { Order } from "./order.entity";

export interface IOrderAdapter {
  getOrdersWithInstrumentData(id: number): Promise<Order[]>;
}
