import { Inject, Injectable, Logger } from "@nestjs/common";
import { IUserAdapter } from "./user.adapter.interface";
import { Adapters } from "@Utils";
import { IOrderAdapter } from "@Order";

@Injectable()
export class UserService {
  constructor(
    @Inject(Adapters.User) private readonly userAdapter: IUserAdapter,
    @Inject(Adapters.Order) private readonly orderAdapter: IOrderAdapter,
  ) {}

  async getPortfolio(id: number) {
    const user = await this.userAdapter.findUserById(id);

    console.log(user);
    const orders = await this.orderAdapter.findOrdersWithInstrumentsByUserId(id);

    Logger.log(orders);

    return user;
  }
}
