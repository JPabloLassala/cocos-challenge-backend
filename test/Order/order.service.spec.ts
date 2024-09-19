import { Test } from "@nestjs/testing";
import { IInstrumentAdapter } from "@/Instrument";
import { IMarketdataAdapter } from "@/Marketdata";
import { IOrderAdapter, OrderService, OrderSides, OrderStatuses, OrderTypes } from "@/Order";
import { IUserAdapter } from "@/User";
import { mockInstrument, mockMarketData, mockOrders, mockUser } from "./mockData";
import { Adapters } from "@/Utils";
import { mockInstrumentAdapter, mockMarketdataAdapter, mockOrderAdapter, mockUserAdapter } from "./mockClasses";

describe("OrderService", () => {
  let orderService: OrderService;
  let orderAdapter: IOrderAdapter;
  let instrumentAdapter: IInstrumentAdapter;
  let userAdapter: IUserAdapter;
  let marketdataAdapter: IMarketdataAdapter;

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [
        OrderService,
        { provide: Adapters.Order, useValue: mockOrderAdapter },
        { provide: Adapters.Instrument, useValue: mockInstrumentAdapter },
        { provide: Adapters.User, useValue: mockUserAdapter },
        { provide: Adapters.Marketdata, useValue: mockMarketdataAdapter },
      ],
    }).compile();

    orderService = app.get<OrderService>(OrderService);
    instrumentAdapter = app.get<IInstrumentAdapter>(Adapters.Instrument);
    marketdataAdapter = app.get<IMarketdataAdapter>(Adapters.Marketdata);
    userAdapter = app.get<IUserAdapter>(Adapters.User);
    orderAdapter = app.get<IOrderAdapter>(Adapters.Order);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an order with FILLED status", async () => {
    jest.spyOn(instrumentAdapter, "getInstrumentByTicker").mockResolvedValue(mockInstrument);
    jest.spyOn(userAdapter, "getUserById").mockResolvedValue(mockUser);
    jest.spyOn(orderAdapter, "getFilledOrdersByUserId").mockResolvedValue(mockOrders);
    jest.spyOn(marketdataAdapter, "findMarketDataByInstrumentId").mockResolvedValue(mockMarketData);

    const orderData = { side: OrderSides.Buy, type: OrderTypes.Market, size: 2, price: 100 };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { datetime: _datetime, ...result } = await orderService.createOrder(orderData, "AAPL", 1, undefined);

    expect(result).toEqual({ ...orderData, status: OrderStatuses.Filled, instrument: mockInstrument, user: mockUser });
  });

  it("should create an order with NEW status", async () => {
    jest.spyOn(instrumentAdapter, "getInstrumentByTicker").mockResolvedValue(mockInstrument);
    jest.spyOn(userAdapter, "getUserById").mockResolvedValue(mockUser);
    jest.spyOn(orderAdapter, "getFilledOrdersByUserId").mockResolvedValue(mockOrders);
    jest.spyOn(marketdataAdapter, "findMarketDataByInstrumentId").mockResolvedValue(mockMarketData);

    const orderData = { side: OrderSides.Buy, type: OrderTypes.Limit, size: 2, price: 100 };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { datetime: _datetime, ...result } = await orderService.createOrder(orderData, "AAPL", 1, undefined);

    expect(result).toEqual({ ...orderData, status: OrderStatuses.New, instrument: mockInstrument, user: mockUser });
  });

  it("should create a REJECTED order for not having enough available cash", async () => {
    jest.spyOn(instrumentAdapter, "getInstrumentByTicker").mockResolvedValue(mockInstrument);
    jest.spyOn(userAdapter, "getUserById").mockResolvedValue(mockUser);
    jest.spyOn(orderAdapter, "getFilledOrdersByUserId").mockResolvedValue(mockOrders);
    jest.spyOn(marketdataAdapter, "findMarketDataByInstrumentId").mockResolvedValue(mockMarketData);

    const orderData = {
      side: OrderSides.Buy,
      type: OrderTypes.Market,
      size: 5,
      price: 100,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { datetime: _datetime, ...result } = await orderService.createOrder(orderData, "AAPL", 1, undefined);

    expect(result).toEqual({
      ...orderData,
      status: OrderStatuses.Rejected,
      instrument: mockInstrument,
      user: mockUser,
    });
  });

  it("should create a REJECTED order for not having enough assets", async () => {
    jest.spyOn(instrumentAdapter, "getInstrumentByTicker").mockResolvedValue(mockInstrument);
    jest.spyOn(userAdapter, "getUserById").mockResolvedValue(mockUser);
    jest.spyOn(orderAdapter, "getFilledOrdersByUserId").mockResolvedValue(mockOrders);
    jest.spyOn(marketdataAdapter, "findMarketDataByInstrumentId").mockResolvedValue(mockMarketData);

    const orderData = {
      side: OrderSides.Sell,
      type: OrderTypes.Market,
      size: 6,
      price: 100,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { datetime: _datetime, ...result } = await orderService.createOrder(orderData, "AAPL", 1, undefined);

    expect(result).toEqual({
      ...orderData,
      status: OrderStatuses.Rejected,
      instrument: mockInstrument,
      user: mockUser,
    });
  });

  it("should create a CASH_IN order with FILLED status", async () => {
    jest.spyOn(instrumentAdapter, "getInstrumentByTicker").mockResolvedValue(mockInstrument);
    jest.spyOn(userAdapter, "getUserById").mockResolvedValue(mockUser);
    jest.spyOn(orderAdapter, "getFilledOrdersByUserId").mockResolvedValue(mockOrders);
    jest.spyOn(marketdataAdapter, "findMarketDataByInstrumentId").mockResolvedValue(mockMarketData);

    const orderData = { side: OrderSides.CashIn, type: OrderTypes.Market, size: 100, price: 1 };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { datetime: _datetime, ...result } = await orderService.createOrder(orderData, "AAPL", 1, undefined);

    expect(result).toEqual({
      ...orderData,
      status: OrderStatuses.Filled,
      instrument: mockInstrument,
      user: mockUser,
    });
  });

  it("should create a CASH_OUT order with REJECTED status", async () => {
    jest.spyOn(instrumentAdapter, "getInstrumentByTicker").mockResolvedValue(mockInstrument);
    jest.spyOn(userAdapter, "getUserById").mockResolvedValue(mockUser);
    jest.spyOn(orderAdapter, "getFilledOrdersByUserId").mockResolvedValue(mockOrders);
    jest.spyOn(marketdataAdapter, "findMarketDataByInstrumentId").mockResolvedValue(mockMarketData);

    const orderData = { side: OrderSides.CashOut, type: OrderTypes.Market, size: 500, price: 1 };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { datetime: _datetime, ...result } = await orderService.createOrder(orderData, "AAPL", 1, undefined);

    expect(result).toEqual({
      ...orderData,
      status: OrderStatuses.Rejected,
      instrument: mockInstrument,
      user: mockUser,
    });
  });
});
