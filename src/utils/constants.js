export const PLAYERS = ["A", "B", "C", "D"];

export const ROUND_CONFIG = {
  1: { numbers: { from: 0, to: 9, unique: true }, showAllPnL: true, maxStocks: 2 },
  2: { numbers: { from: 0, to: 9, unique: true }, showAllPnL: false, maxStocks: 2 },
  3: { numbers: { from: 0, to: 9, unique: false }, showAllPnL: false, maxStocks: 2 },
  4: { numbers: { from: -9, to: 9, unique: true }, showAllPnL: false, maxStocks: 3 }
};

export const DURATIONS = {
  SELL_WINDOW: 30,      // seconds
  TURN_WINDOW: 150,     // 2.5 min in seconds
  OFFER_LIFETIME: 15    // seconds
};
