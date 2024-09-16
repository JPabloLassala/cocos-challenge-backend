import { Injectable } from "@nestjs/common";
import { IUserAdapter } from "./user.adapter.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserAdapter implements IUserAdapter {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
