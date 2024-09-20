import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, ValidateIf } from "class-validator";
import { OrderSides, OrderTypes } from "../Domain";

export class CreateOrderDTO {
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsString()
  @IsNotEmpty()
  assetTicker: string;

  @IsNumber()
  @IsPositive()
  @ValidateIf((object) => object.type === OrderTypes.Market)
  initialInvestment: number;

  @IsNumber()
  @IsPositive()
  @ValidateIf((params) => params.type === OrderTypes.Limit)
  price: number;

  @IsEnum(OrderTypes)
  type: OrderTypes;

  @IsEnum(OrderSides)
  side: OrderSides;
}
