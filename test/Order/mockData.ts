import { InstrumentTypes } from "@/Instrument";
import { Instrument } from "@/Instrument/Domain/instrument.entity";
import { Marketdata } from "@/Marketdata/Domain/marketdata.entity";
import { OrderSides, OrderStatuses, OrderTypes } from "@/Order";
import { Order } from "@/Order/Domain/order.entity";
import { User } from "@/User/Domain/user.entity";

export const mockUser: User = {
  id: 1,
  email: "emiliano@test.com",
  accountNumber: "10001",
  orders: [],
};

export const mockInstrument: Instrument = {
  id: 1,
  ticker: "AAPL",
  name: "Apple Inc.",
  orders: [],
  marketdata: [],
  type: InstrumentTypes.Shares,
};

export const mockMarketData: Marketdata = {
  id: 1,
  instrument: mockInstrument as Instrument,
  close: 100,
  high: 100,
  low: 90,
  open: 95,
  previousclose: 95,
  date: new Date(),
};

export const mockOrders: Order[] = [
  {
    id: 1,
    side: OrderSides.CashIn,
    type: OrderTypes.Market,
    size: 1000,
    status: OrderStatuses.Filled,
    instrument: mockInstrument as Instrument,
    datetime: new Date(),
    price: 1,
    user: mockUser,
  },
  {
    id: 2,
    side: OrderSides.CashOut,
    type: OrderTypes.Market,
    size: 500,
    status: OrderStatuses.Filled,
    instrument: mockInstrument as Instrument,
    datetime: new Date(),
    price: 1,
    user: mockUser,
  },
  {
    id: 3,
    side: OrderSides.Buy,
    type: OrderTypes.Market,
    size: 2,
    instrument: mockInstrument as Instrument,
    status: OrderStatuses.Filled,
    datetime: new Date(),
    price: 100,
    user: mockUser,
  },
  {
    id: 4,
    side: OrderSides.Sell,
    type: OrderTypes.Market,
    instrument: mockInstrument as Instrument,
    size: 1,
    status: OrderStatuses.Filled,
    datetime: new Date(),
    price: 100,
    user: mockUser,
  },
];
