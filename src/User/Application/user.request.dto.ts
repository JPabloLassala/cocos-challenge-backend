import { Exclude, Transform } from "class-transformer";
import { IsNumber } from "class-validator";

export class GetPortfolioRequestDTO {
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  id: number;
}

export class GetPortfolioResponseDTO {
  @Exclude()
  id: number;
  email: string;
  accountNumber: string;
  remainingBalance: number;
  remainingStock: number;
  totalValue: number;
  stockPerformance: number;
}
