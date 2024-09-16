import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { GetPortfolioRequestDTO } from "./user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":id")
  async getPorfolio(@Param() dto: GetPortfolioRequestDTO) {
    return await this.userService.getPortfolio(dto.id);
  }
}
