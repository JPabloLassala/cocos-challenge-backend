import { IsOptional, IsString, ValidateIf } from "class-validator";

export class FindAssetRequestDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @ValidateIf((dto: FindAssetRequestDTO) => !Boolean(dto.name))
  @IsString()
  @IsOptional()
  ticker?: string;
}
