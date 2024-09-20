export const mockOrderAdapter = {
  getFilledOrdersByUserId: jest.fn(),
  getShareOrders: jest.fn(),
  createOrder: jest.fn(),
};

export const mockInstrumentAdapter = {
  getInstrumentByTicker: jest.fn(),
};

export const mockUserAdapter = {
  getUserById: jest.fn(),
};

export const mockMarketdataAdapter = {
  findMarketDataByInstrumentId: jest.fn(),
};

jest.mock("@/Order/Infrastructure/order.adapter", () => mockOrderAdapter);
jest.mock("@/Instrument/Infrastructure/instrument.adapter", () => mockInstrumentAdapter);
jest.mock("@/User/Infrastructure/user.adapter", () => mockUserAdapter);
jest.mock("@/Marketdata/Infrastructure/marketdata.adapter", () => mockMarketdataAdapter);
