module.exports = class GetStockPriceController {
  #getStockPriceService;
  #addLikeService;
  #getLikeService;

  constructor(getStockPriceService, addLikeService, getLikeService) {
    this.#getStockPriceService = getStockPriceService;
    this.#addLikeService = addLikeService;
    this.#getLikeService = getLikeService;
  }

  async execute(request) {
    const { query, ip } = request;
    const { stock, like } = query;

    if (Array.isArray(stock)) {
      const { symbol, latestPrice } = await this.#getStockPriceService.execute(
        stock[0]
      );
      const { symbol: symbol2, latestPrice: latestPrice2 } =
        await this.#getStockPriceService.execute(stock[1]);

      const stockData = [];

      if (symbol) {
        const likeData1 = await this.#getLikeService.execute(symbol);
        stockData.push({
          stock: symbol,
          price: latestPrice,
          likes: likeData1 ? likeData1.likes.length : 0,
        });
      }

      if (symbol2) {
        const likeData2 = await this.#getLikeService.execute(symbol2);
        stockData.push({
          stock: symbol2,
          price: latestPrice2,
          likes: likeData2 ? likeData2.likes.length : 0,
        });
      }

      if (stockData.length === 2) {
        const greatestLikeCount =
          stockData[0].likes.length > stockData[1].likes.length
            ? stockData[0].likes.length
            : stockData[1].likes.length;

        const smallestLikeCount =
          stockData[1].likes.length < stockData[0].likes.length
            ? stockData[1].likes.length
            : stockData[0].likes.length;

        const relLikes = greatestLikeCount - smallestLikeCount;

        stockData[0].rel_likes = relLikes;
        delete stockData[0].likes;
        stockData[1].rel_likes = relLikes;
        delete stockData[1].likes;
      }

      return { stockData };
    }

    const { symbol, latestPrice } = await this.#getStockPriceService.execute(
      stock
    );

    if (!symbol) {
      return {
        stockData: {
          likes: like ? 1 : 0,
        },
      };
    }

    if (like && like !== "false") {
      const addedLike = await this.#addLikeService.execute(symbol, ip);
      const likeData = await this.#getLikeService.execute(symbol);

      return {
        stockData: {
          stock: symbol,
          price: latestPrice,
          likes: addedLike
            ? addedLike.likes.length
            : likeData
            ? likeData.likes.length
            : 0,
        },
      };
    } else {
      const likeData = await this.#getLikeService.execute(symbol);

      return {
        stockData: {
          stock: symbol,
          price: latestPrice,
          likes: likeData ? likeData.likes.length : 0,
        },
      };
    }
  }
};
