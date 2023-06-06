const AddLikeService = require("../../../data/services/likes/add-like-service");
const GetStockPriceService = require("../../../data/services/stockPrice/get-stockPrice-service");
const StockPriceApi = require("../../../data/utils/stockPrice/stockPrice-api");
const LikeRepository = require("../../../infra/repositories/like/like-repository");
const GetStockPriceController = require("../../../presentation/controllers/stockPrice/get-stockPrice-controller");
const MockedDatabase = require("../../../infra/database/mocks/mocked-database");
const GetLikeService = require("../../../data/services/likes/get-like-service");

module.exports = function makeGetStockPriceControllerFactory() {
  const database = MockedDatabase;
  const repository = new LikeRepository(database);
  const stockPriceApi = new StockPriceApi();
  const getStockPriceService = new GetStockPriceService(stockPriceApi);
  const addLikeService = new AddLikeService(repository);
  const getLikeService = new GetLikeService(repository);

  return new GetStockPriceController(
    getStockPriceService,
    addLikeService,
    getLikeService
  );
};
