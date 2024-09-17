import { OrderModule } from "@Order";
import { Adapters } from "@Utils";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "../Application/user.controller";
import { UserService } from "../Domain/user.service";
import { User } from "../Domain/user.entity";
import { UserAdapter } from "./user.adapter";

@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: Adapters.User,
      useClass: UserAdapter,
    },
  ],
})
export class UserModule {}
