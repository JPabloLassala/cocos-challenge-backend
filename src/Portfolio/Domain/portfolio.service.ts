import { Inject, Injectable } from "@nestjs/common";
import { Portfolio, RemainingAsset, RemainingAssets } from "./portfolio.entity";
import { IUserAdapter } from "@/User";
import { IOrderAdapter, OrderSides } from "@/Order";
import { Order } from "@/Order/Domain/order.entity";
import { Adapters } from "@/Utils";
import { InstrumentTypes, PESOS } from "@/Instrument";
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
    const instrumentIds = orders
      .filter((order) => order.side !== OrderSides.CashIn && order.side !== OrderSides.CashOut)
      .map((order) => order.instrument.id);
    console.log("instrumentIds", instrumentIds);
    const marketDataFromOrders = await this.marketDataAdapter.findMarketDataByInstrumentIds(instrumentIds);

    const remainingAssets = this.calculateRemainingAssets(orders).map((asset: RemainingAsset) => {
      const performances = this.getPerformances(asset, orders, marketDataFromOrders);

      return { ...performances };
    });

    return { user, remainingAssets };
  }

  private calculateRemainingAssets(orders: Order[]): RemainingAssets {
    const remainingCash = orders.reduce<RemainingAsset>(
      (acc: RemainingAsset, order: Order): RemainingAsset => {
        if (order.instrument.type !== InstrumentTypes.Cash) return acc;

        const value = this.getOrderValueInCash(order);
        acc.totalValue += value;
        acc.amount += order.size;
        acc.instrumentId = order.instrument.id;

        return acc;
      },
      { name: PESOS, totalValue: 0, performancePercentage: 0, performanceValue: 0, amount: 0, instrumentId: 0 },
    );

    const remainingAssets = orders.reduce<RemainingAssets>((acc, order: Order): RemainingAssets => {
      if (order.instrument.type === InstrumentTypes.Cash) return acc;

      const existingOrder = acc.find((a) => a.name === order.instrument.name);
      if (existingOrder) {
        existingOrder.totalValue += this.getOrderValue(order);
        existingOrder.amount += this.getOrderSize(order);

        return acc;
      }

      return [
        ...acc,
        {
          instrumentId: order.instrument.id,
          name: order.instrument.name,
          totalValue: this.getOrderValue(order),
          amount: this.getOrderSize(order),
          performancePercentage: 0,
          performanceValue: 0,
        },
      ];
    }, []);

    return [remainingCash, ...remainingAssets];
  }

  private getOrderValueInCash(order: Order) {
    if (order.side === OrderSides.Sell) {
      return order.price * order.size * -1;
    } else if (order.side === OrderSides.CashOut) {
      return order.size * -1;
    } else if (order.side === OrderSides.Buy) {
      return order.price * order.size;
    } else {
      return order.size;
    }
  }

  private getOrderValue(order: Order) {
    if (order.side === OrderSides.Sell) {
      return order.size * -1;
    } else if (order.side === OrderSides.Buy) {
      return order.size;
    }
  }

  private getOrderSize(order: Order) {
    if (order.side === OrderSides.Sell) {
      return order.size * -1;
    } else if (order.side === OrderSides.Buy) {
      return order.size;
    }
  }

  private getPerformances(asset: RemainingAsset, orders: Order[], marketData: Marketdata[]): RemainingAsset {
    console.log("marketData", marketData);
    const marketDataEntry = marketData.find((m) => m.instrument.id === asset.instrumentId);
    const currentValue = asset.amount * marketDataEntry.close;
    const performanceValue = currentValue - asset.totalValue;
    const percentage = (performanceValue / asset.totalValue) * 100;

    return { ...asset, performancePercentage: percentage, performanceValue };
  }
}
