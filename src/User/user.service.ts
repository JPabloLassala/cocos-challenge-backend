import { Inject, Injectable } from "@nestjs/common";
import { IUserAdapter } from "./user.adapter.interface";
import { Adapters } from "@Utils";

@Injectable()
export class UserService {
  constructor(@Inject(Adapters.User) private readonly userAdapter: IUserAdapter) {}

  async getPortfolio(id: number) {
    const user = await this.userAdapter.findUserById(id);

    return user;
  }
}
