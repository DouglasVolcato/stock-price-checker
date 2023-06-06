const axios = require("axios");

module.exports = class StockPriceApi {
  #link;

  constructor() {
    this.#link =
      "https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock";
  }

  async getStockInfo(stockSymbol) {
    const link = `${this.#link}/${stockSymbol}/quote`;
    const stockData = await axios.get(link);
    const { symbol, latestPrice } = stockData.data;

    return { symbol, latestPrice };
  }
};
