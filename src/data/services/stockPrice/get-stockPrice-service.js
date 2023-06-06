module.exports = class GetStockPriceService {
  #stockPriceApi;

  constructor(stockPriceApi) {
    this.#stockPriceApi = stockPriceApi;
  }

  async execute(stockSymbol) {
    return await this.#stockPriceApi.getStockInfo(stockSymbol);
  }
};
