import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IUserAdapter } from "@User/Domain";
import { User } from "@User/Domain/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserAdapter implements IUserAdapter {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
