export class OrderRecordDTO {
  instrumentId: number;
  userId: number;
  size: number;
  price: number;
  type: string;
  side: string;
  status: string;
  datetime: Date;
}

export type CreateOrderRecordDTO = Omit<OrderRecordDTO, "id">;
