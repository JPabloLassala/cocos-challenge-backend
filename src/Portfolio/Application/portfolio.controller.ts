import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseInterceptors,
} from "@nestjs/common";
import { PortfolioDTO, PortfolioRequestDTO } from "./portfolio.request.dto";
import { PortfolioService } from "@/Portfolio/Domain";
import { plainToClass } from "class-transformer";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("portfolio")
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async getPorfolio(@Param() dto: PortfolioRequestDTO): Promise<PortfolioDTO> {
    const porfolio = await this.portfolioService.getPortfolio(dto.userid);

    return plainToClass(PortfolioDTO, porfolio);
  }
}
