import { Adapters } from "@/Utils";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../Domain/user.entity";
import { UserAdapter } from "./user.adapter";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    {
      provide: Adapters.User,
      useClass: UserAdapter,
    },
  ],
  exports: [Adapters.User],
})
export class UserModule {}
