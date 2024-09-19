import { Adapters } from "@/Utils";
import { Inject, Injectable } from "@nestjs/common";
import { IOrderAdapter } from "./order.adapter.interface";
import { Order } from "./order.entity";
import { IInstrumentAdapter, InstrumentNotFoundError } from "@/Instrument";
import { IUserAdapter } from "@/User";
import { UserNotFoundError } from "@/User/Application/user.error";
import { OrderSides, OrderStatuses, OrderTypes } from "./order.constants";
import { Instrument } from "@/Instrument/Domain/instrument.entity";
import { User } from "@/User/Domain/user.entity";
import { IMarketdataAdapter } from "@/Marketdata";

@Injectable()
export class OrderService {
  constructor(
    @Inject(Adapters.Order) private readonly orderAdapter: IOrderAdapter,
    @Inject(Adapters.Instrument) private readonly instrumentAdapter: IInstrumentAdapter,
    @Inject(Adapters.User) private readonly userAdapter: IUserAdapter,
    @Inject(Adapters.Marketdata) private readonly marketdataAdapter: IMarketdataAdapter,
  ) {}

  async createOrder(
    orderData: Partial<Order>,
    assetTicker: string,
    userId: number,
    investment: number,
  ): Promise<Order> {
    let cashOrder: Order;
    let assetOrder: Order;

    const instrument = await this.instrumentAdapter.getInstrumentByTicker(assetTicker);
    if (!instrument) throw new InstrumentNotFoundError();

    const user = await this.userAdapter.getUserById(userId);
    if (!user) throw new UserNotFoundError();

    const previousOrders = await this.orderAdapter.getFilledOrdersByUserId(userId);

    if (orderData.side === OrderSides.CashIn || orderData.side === OrderSides.CashOut) {
      cashOrder = this.createCashOrder(orderData, instrument, user, previousOrders);
    } else {
      assetOrder = await this.createAssetOrder(orderData, instrument, user, previousOrders, investment);
    }

    await this.orderAdapter.createOrder(cashOrder || assetOrder);

    return cashOrder || assetOrder;
  }

  private createCashOrder(
    orderData: Partial<Order>,
    instrument: Instrument,
    user: User,
    previousOrders: Order[],
  ): Order {
    let status: OrderStatuses;

    if (orderData.side === OrderSides.CashIn) {
      orderData.status = orderData.type === OrderTypes.Market ? OrderStatuses.Filled : OrderStatuses.New;
    } else {
      const availableCash = this.calculateAvailableCash(previousOrders);

      if (orderData.size > availableCash) {
        status = OrderStatuses.Rejected;
      } else {
        status = orderData.type === OrderTypes.Market ? OrderStatuses.Filled : OrderStatuses.New;
      }
    }

    return {
      datetime: new Date(),
      status,
      side: orderData.side,
      size: orderData.size,
      price: 1,
      type: orderData.type,
      instrument,
      user,
    };
  }

  async createAssetOrder(
    orderData: Partial<Order>,
    instrument: Instrument,
    user: User,
    previousOrders: Order[],
    investment: number,
  ): Promise<Order> {
    let status: OrderStatuses;
    let isOperationPossible: boolean;
    const marketData = await this.marketdataAdapter.findMarketDataByInstrumentId(instrument.id);
    const price = orderData.type === OrderTypes.Market ? marketData.close : orderData.price;
    const size = () => (investment ? Math.floor(investment / price) : orderData.size);

    if (orderData.side === OrderSides.Buy) {
      const availableCash = this.calculateAvailableCash(previousOrders);
      isOperationPossible = this.canBuy(availableCash, price, size(), investment);
    } else {
      const remainingAssets = this.calculateAvailableAssets(previousOrders, instrument);
      isOperationPossible = this.canSell(remainingAssets, size());
    }

    if (!isOperationPossible) {
      status = OrderStatuses.Rejected;
    } else {
      status = orderData.type === OrderTypes.Market ? OrderStatuses.Filled : OrderStatuses.New;
    }

    return {
      datetime: new Date(),
      status,
      side: orderData.side,
      size: size(),
      price,
      type: orderData.type,
      instrument,
      user,
    };
  }

  calculateAvailableCash(orders: Order[]): number {
    return orders.reduce((sum, order) => {
      if (order.side === OrderSides.CashIn) sum += order.size;
      else if (order.side === OrderSides.CashOut) sum -= order.size;
      else if (order.side === OrderSides.Buy) sum -= order.size * order.price;
      else sum += order.size * order.price;

      return sum;
    }, 0);
  }

  calculateAvailableAssets(orders: Order[], instrument: Instrument): number {
    return orders.reduce((sum, order) => {
      if (order.instrument.id === instrument.id) {
        if (order.side === OrderSides.Buy) sum += order.size;
        else sum -= order.size;
      }

      return sum;
    }, 0);
  }

  canBuy(availableCash: number, price: number, size: number, investment: number): boolean {
    if (availableCash < price * size) return false;
    if (investment && investment > availableCash) return false;
    if (investment && investment < price) return false;

    return true;
  }

  canSell(availableAssets: number, size: number): boolean {
    if (size > availableAssets) return false;
  }
}
