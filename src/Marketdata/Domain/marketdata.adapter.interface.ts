export interface IMarketdataAdapter {
  findUserById(id: number): Promise<any>;
}
