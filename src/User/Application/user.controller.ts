import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from "@nestjs/common";
import { GetPortfolioRequestDTO } from "./user.request.dto";
import { UserService } from "@User/Domain";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(":id")
  async getPorfolio(@Param() dto: GetPortfolioRequestDTO) {
    return await this.userService.getPortfolio(dto.id);
  }
}
