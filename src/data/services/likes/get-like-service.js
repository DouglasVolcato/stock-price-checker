module.exports = class GetLikeService {
  #repository;

  constructor(repository) {
    this.#repository = repository;
  }

  async execute(stockSymbol) {
    return await this.#repository.get(stockSymbol);
  }
};
