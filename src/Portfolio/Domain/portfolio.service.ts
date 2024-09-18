import { Inject, Injectable } from "@nestjs/common";
import { Portfolio, RemainingAsset, RemainingAssets } from "./portfolio.entity";
import { UserAdapter } from "@/User";
import { OrderAdapter, OrderSides, OrderTypes } from "@/Order";
import { Order } from "@/Order/Domain/order.entity";
import { Adapters } from "@/Utils";
import { InstrumentTypes, PESOS } from "@/Instrument";

@Injectable()
export class PortfolioService {
  constructor(
    @Inject(Adapters.User) private readonly userAdapter: UserAdapter,
    @Inject(Adapters.Order) private readonly orderAdapter: OrderAdapter,
  ) {}

  async getPortfolio(userId: number): Promise<Portfolio> {
    const user = await this.userAdapter.getUserById(userId);
    const orders = await this.orderAdapter.getOrdersWithInstrumentData(userId);
    const performances = this.getPerformances(orders);
    const remainingAssets = this.calculateRemainingAssets(orders).map((asset) => {
      const performance = performances.find((p) => p.name === asset.name)?.performance || 0;

      return { ...asset, performance };
    });

    return { user, remainingAssets };
  }

  private calculateRemainingAssets(orders: Order[]): RemainingAssets {
    const shareOrders = orders.filter((order) => order.instrument.type === InstrumentTypes.Shares);
    const remainingAssetsCash = shareOrders.reduce(
      (acc: RemainingAsset, order: Order): RemainingAsset => {
        const value = this.getOrderValueInCash(order);
        acc.total += value;

        return acc;
      },
      { name: PESOS, total: 0, performance: 0 },
    );

    const remainingAssets = shareOrders.reduce((acc: RemainingAssets, order: Order) => {
      if (order.instrument.name === PESOS && order.instrument.type === InstrumentTypes.Cash) {
        return acc;
      }

      const existingOrder = acc.find((a) => a.name === order.instrument.name);

      if (existingOrder) {
        existingOrder.total += this.getOrderValue(order);

        return acc;
      }

      return [...acc, { name: order.instrument.name, total: this.getOrderValue(order), performance: 0 }];
    }, []);

    return [remainingAssetsCash, ...remainingAssets];
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

  private getPerformances(orders: Order[]): Array<Partial<RemainingAsset>> {
    return orders.reduce((acc: Array<Partial<RemainingAsset>>, order: Order) => {
      if (!acc.find((a) => a.name === order.instrument.name)) {
        const ordersFromSameInstrument = orders.filter((o) => o.instrument.name === order.instrument.name);
        acc.push({ name: order.instrument.name, performance: this.getPerformance(ordersFromSameInstrument) });

        return acc;
      }

      return acc;
    }, []);
  }

  private getPerformance(orders: Order[]): number {
    const totalSpent = orders.reduce((acc: number, order) => {
      if (order.side === OrderSides.Buy) {
        acc += order.price * order.size;
      }

      return acc;
    }, 0);
    const averagePrice = totalSpent / orders.filter((o) => o.side === OrderSides.Buy).length;
    const totalProfit = orders.reduce((acc: number, order) => {
      if (order.side === OrderSides.Sell) {
        const sellValuePerAsset = order.price / order.size;
        const profitOrLoss = sellValuePerAsset - averagePrice;
        const totalProfit = profitOrLoss * order.size;

        acc += totalProfit;
      }

      return acc;
    }, 0);
    const remainingValue = orders.reduce((acc: number, order) => {
      if (order.side === OrderSides.Buy) {
        acc += order.size * averagePrice;
      }
      if (order.side === OrderSides.Sell) {
        acc -= order.size * averagePrice;
      }

      return acc;
    }, 0);

    return (totalProfit + remainingValue - totalSpent) / totalSpent;
  }
}
