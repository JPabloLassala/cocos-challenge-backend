import { Controller, Get } from "@nestjs/common";

@Controller("marketdata")
export class MarketdataController {
  constructor() {}

  @Get()
  async findMarketdata() {}
}
