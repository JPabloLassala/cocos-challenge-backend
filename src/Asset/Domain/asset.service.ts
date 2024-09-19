import { IInstrumentAdapter } from "@/Instrument";
import { Inject, Injectable } from "@nestjs/common";
import { Adapters } from "@/Utils";

@Injectable()
export class AssetService {
  constructor(@Inject(Adapters.Instrument) private readonly instrumentAdapter: IInstrumentAdapter) {}

  async getAssets(name?: string, type?: string) {
    return await this.instrumentAdapter.getInstrumentsByNameOrTicker(name, type);
  }
}
