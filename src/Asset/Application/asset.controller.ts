import { AssetService } from "@/Asset/Domain";
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { FindAssetRequestDTO } from "./asset.request.dto";

@UseInterceptors(ClassSerializerInterceptor)
@Controller("asset")
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAssets(@Query() query: FindAssetRequestDTO) {
    const { name, ticker } = query;
    console.log(query);

    return this.assetService.getAssets(name, ticker);
  }
}
