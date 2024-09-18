import { User } from "@/User/Domain/user.entity";
import { Type } from "class-transformer";

export class RemainingAssets extends Array<RemainingAsset> {}

export class RemainingAsset {
  name: string;
  total: number;
  performance: number;
}

export class Portfolio {
  @Type(() => User)
  user: User;

  @Type(() => RemainingAsset)
  remainingAssets: RemainingAssets;
}
