import { Exclude } from "class-transformer";

export class UserResponseDTO {
  @Exclude()
  id: number;
  email: string;
  accountNumber: string;
}
