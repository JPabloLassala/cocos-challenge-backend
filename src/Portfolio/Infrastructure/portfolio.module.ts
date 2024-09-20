import { InstrumentModule } from "@/Instrument";
import { Module } from "@nestjs/common";
import { OrderModule } from "@/Order";
import { PortfolioController } from "@/Portfolio/Application";
import { PortfolioService } from "@/Portfolio/Domain";
import { UserModule } from "@/User";
import { MarketdataModule } from "@/Marketdata";

@Module({
  imports: [UserModule, OrderModule, InstrumentModule, MarketdataModule],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [],
})
export class PortfolioModule {}
