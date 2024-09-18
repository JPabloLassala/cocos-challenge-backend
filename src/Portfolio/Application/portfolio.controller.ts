import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseInterceptors,
} from "@nestjs/common";
import { PortfolioRequestDTO } from "./portolio.request.dto";
import { PortfolioService } from "@/Portfolio/Domain";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("portfolio")
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getPorfolio(@Param() dto: PortfolioRequestDTO) {
    return await this.portfolioService.getPortfolio(dto.userid);
  }
}
