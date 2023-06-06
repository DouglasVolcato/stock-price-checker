module.exports = class LikeRepository {
  #database;

  constructor(database) {
    this.#database = database;
  }

  async create(stockData) {
    return this.#database.push(stockData);
  }

  async update(stockSymbol, stockData) {
    await new Promise(function (resolve) {
      for (let index = 0; index < this.#database.length; index++) {
        if (stockSymbol === this.#database[index].symbol) {
          this.#database.splice(index, 1, stockData);
        }
      }

      resolve();
    });

    return;
  }

  async delete(stockSymbol) {
    await new Promise(function (resolve) {
      for (let index = 0; index < this.#database.length; index++) {
        if (stockSymbol === this.#database[index].symbol) {
          this.#database.splice(index, 1);
        }
      }

      resolve();
    });

    return;
  }

  async get(stockSymbol) {
    return await Promise.resolve(
      this.#database.find(function (item) {
        return item.symbol === stockSymbol;
      })
    );
  }
};
