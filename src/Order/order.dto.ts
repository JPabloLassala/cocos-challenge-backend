import { Transform } from "class-transformer";

export class OrderDTO {
  instrumentId: number;
  userId: number;
  size: number;
  price: number;
  type: string;
  side: string;
  status: string;
  datetime: Date;
}

export class SendOrderRequestDTO {
  instrumentId: number;
  userId: number;
  size: number;
  price: number;
  type: string;
  side: string;
  status: string;
  datetime: Date;
}

export class SendOrderResponseDTO {
  id: number;
  instrumentId: number;
  userId: number;
  size: number;
  price: number;
  type: string;
  side: string;
  status: string;
  @Transform(({ value }) => value.toISOString())
  datetime: string;
}
