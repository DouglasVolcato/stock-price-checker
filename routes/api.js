"use strict";
const makeGetStockPriceControllerFactory = require("../src/main/factories/controllers/get-stockPrice-controller-factory");

module.exports = function (app) {
  app.route("/api/stock-prices").get(async function (req, res) {
    const getStockPrice = makeGetStockPriceControllerFactory();
    const response = await getStockPrice.execute(req);

    res.json(response);
  });
};
