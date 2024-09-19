// import { Instrument } from "@/Instrument/Domain/instrument.entity";
import { Order } from "./order.entity";
// import { User } from "@/User/Domain/user.entity";

export interface IOrderAdapter {
  getFilledOrdersByUserId(id: number): Promise<Order[]>;
  // createOrder(newOrder: Partial<Order>, instrument: Instrument, user: User): Promise<Order>;
}
