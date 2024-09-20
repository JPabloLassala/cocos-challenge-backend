import { Inject, Injectable } from "@nestjs/common";
import { Portfolio, RemainingAsset, RemainingAssets } from "./portfolio.entity";
import { IUserAdapter } from "@/User";
import { IOrderAdapter, OrderSides } from "@/Order";
import { Order } from "@/Order/Domain/order.entity";
import { Adapters } from "@/Utils";
import { IMarketdataAdapter } from "@/Marketdata";
import { Marketdata } from "@/Marketdata/Domain/marketdata.entity";

@Injectable()
export class PortfolioService {
  constructor(
    @Inject(Adapters.User) private readonly userAdapter: IUserAdapter,
    @Inject(Adapters.Order) private readonly orderAdapter: IOrderAdapter,
    @Inject(Adapters.Marketdata) private readonly marketDataAdapter: IMarketdataAdapter,
  ) {}

  async getPortfolio(userId: number): Promise<Portfolio> {
    const user = await this.userAdapter.getUserById(userId);
    const orders = await this.orderAdapter.getFilledOrdersByUserId(userId);
    const instrumentIds = Array.from(
      orders.reduce((set, order) => set.add(order.instrument.id), new Set<number>()),
    );
    const marketData = await this.marketDataAdapter.findMarketDataByInstrumentIds(instrumentIds);
    const remainingCash = this.calculateRemainingCash(orders);
    const remainingAssets = this.calculateRemainingAssets(orders, marketData);

    return { user, remainingCash, remainingAssets };
  }

  calculateRemainingCash(orders: Order[]): number {
    return orders.reduce<number>((cash, order: Order) => {
      if (order.side === OrderSides.Sell) return cash + order.price * order.size;
      else if (order.side === OrderSides.Buy) return cash - order.price * order.size;
      else if (order.side === OrderSides.CashIn) return cash + order.size;
      else if (order.side === OrderSides.CashOut) return cash - order.size;

      return cash;
    }, 0);
  }

  private calculateRemainingAssets(orders: Order[], marketdata: Marketdata[]): RemainingAssets {
    const result = orders.reduce<RemainingAsset[]>((acc, order: Order): RemainingAsset[] => {
      const existingAsset = acc.find((a) => a.instrumentId === order.instrument.id);
      const totalValue = this.getCurrentValueInCash(order, []);
      const amount = this.getOrderSize(order);

      if (!existingAsset) {
        const newRemainingAsset = {
          instrumentId: order.instrument.id,
          name: order.instrument.name,
          totalValue,
          amount,
          performancePercentage: 0,
          performanceValue: 0,
        };

        return [...acc, newRemainingAsset];
      }

      existingAsset.totalValue += this.getCurrentValueInCash(order, []);
      existingAsset.amount += this.getOrderSize(order);

      return acc;
    }, []);

    result.forEach((asset) => {
      const marketValue = orders
        .filter((order) => order.instrument.id === asset.instrumentId)
        .reduce<number>((val, order) => val + this.getCurrentValueInCash(order, marketdata), 0);
      const performancePercentage = ((marketValue - asset.totalValue) / asset.totalValue) * 100;
      const performanceValue = parseFloat((marketValue - asset.totalValue).toFixed(2));
      asset.totalValue = marketValue;
      asset.performancePercentage = performancePercentage;
      asset.performanceValue = performanceValue;
    });

    return result;
  }

  private getCurrentValueInCash(order: Order, marketData: Marketdata[]): number {
    if (marketData.length) {
      const market = marketData.find((m) => m.instrument.id === order.instrument.id);
      if (market) {
        if (order.side === OrderSides.Sell) return parseFloat(market.close) * order.size * -1;
        else if (order.side === OrderSides.Buy) return parseFloat(market.close) * order.size;
        else return 0;
      }
    }

    if (order.side === OrderSides.CashIn) return order.size;
    else if (order.side === OrderSides.CashOut) return order.size * -1;
    else if (order.side === OrderSides.Buy) return order.price * order.size;
    else if (order.side === OrderSides.Sell) return order.price * order.size * -1;
    else return order.size;
  }

  private getOrderValue(order: Order) {
    if (order.side === OrderSides.Sell) return order.size * -1;
    else if (order.side === OrderSides.Buy) return order.size;
  }

  private getOrderSize(order: Order) {
    if (order.side === OrderSides.Sell || order.side === OrderSides.CashOut) return order.size * -1;
    else if (order.side === OrderSides.Buy || order.side === OrderSides.CashIn) return order.size;
  }
}
