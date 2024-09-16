import { Adapters } from "@Utils";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { UserService } from "./user.service";
import { UserAdapter } from "./user.adapter";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
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
