import { User } from "@/User/Domain/user.entity";
import { Type } from "class-transformer";

export class RemainingAssets extends Array<RemainingAsset> {}

export class RemainingAsset {
  instrumentId: number;
  name: string;
  amount: number;
  totalValue: number;
  performancePercentage: number;
  performanceValue: number;
}

export class Portfolio {
  @Type(() => User)
  user: User;

  remainingCash: number;

  @Type(() => RemainingAsset)
  remainingAssets: RemainingAssets;
}
