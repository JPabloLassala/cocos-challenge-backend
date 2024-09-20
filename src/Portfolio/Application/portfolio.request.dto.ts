import { UserResponseDTO } from "@/User";
import { Expose, Transform, Type } from "class-transformer";

class RemainingAssets extends Array<RemainingAssetDTO> {}

@Expose()
class RemainingAssetDTO {
  name: string;
  instrumentId: number;
  @Transform((value) => parseFloat(value.value))
  totalValue: string;
  amount: number;

  @Transform((value) => parseFloat(value.value).toFixed(2))
  performancePercentage: number;
  performanceValue: number;
}

export class PortfolioDTO {
  @Type(() => UserResponseDTO)
  user: UserResponseDTO;

  @Type(() => RemainingAssetDTO)
  remainingAssets: RemainingAssets;
}

export class PortfolioRequestDTO {
  id: number;
}
