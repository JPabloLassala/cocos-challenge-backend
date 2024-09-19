import { HttpException, HttpStatus } from "@nestjs/common";

export class InstrumentNotFoundError extends HttpException {
  constructor() {
    super("Instrument not found", HttpStatus.NOT_FOUND);
  }
}
