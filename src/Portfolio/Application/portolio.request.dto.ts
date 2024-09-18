import { UserResponseDTO } from "@/User";
import { Transform, Type } from "class-transformer";

class RemainingAssets extends Array<RemainingAssetDTO> {}

class RemainingAssetDTO {
  name: string;

  @Transform((value) => parseFloat(value.value))
  total: string;
  performance: number;
}

export class PortfolioDTO {
  @Type(() => UserResponseDTO)
  user: UserResponseDTO;

  @Type(() => RemainingAssetDTO)
  remainingAssets: RemainingAssets;
}

export class PortfolioRequestDTO {
  userid: number;
}
