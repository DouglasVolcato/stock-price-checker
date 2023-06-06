module.exports = class AddLikeService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(stockSymbol, ip) {
    const foundStock = await this.#repository.get(stockSymbol);

    if (!foundStock) {
      const newStockData = {
        symbol: stockSymbol,
        likes: [ip],
      };

      await this.#repository.create(newStockData);

      return newStockData;
    }

    if (foundStock.likes.indexOf(ip) === -1) {
      const updatedStockData = {
        symbol: stockSymbol,
        likes: [...foundStock.likes, ip],
      };

      await this.#repository.update(stockSymbol, updatedStockData);

      return updatedStockData;
    }
  }
};
