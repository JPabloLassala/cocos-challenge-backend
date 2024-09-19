import { AssetController } from "@/Asset/Application";
import { AssetService } from "@/Asset/Domain";
import { InstrumentModule } from "@/Instrument";
import { Module } from "@nestjs/common";

@Module({
  imports: [InstrumentModule],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
