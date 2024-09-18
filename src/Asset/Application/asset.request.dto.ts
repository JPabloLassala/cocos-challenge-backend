import { IsOptional, IsString, ValidateIf } from "class-validator";

export class FindAssetRequestDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @ValidateIf((dto: FindAssetRequestDTO) => {
    console.log(dto);
    return !Boolean(dto.name);
  })
  @IsString()
  @IsOptional()
  ticker?: string;
}
