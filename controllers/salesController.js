const salesService = require('../services/salesService');

const { httpStatus } = require('../helpers');

const createSale = async (req, res, next) => {
  try {
    const sales = req.body;
    const sold = await salesService.createSale(sales, res);
    return res.status(httpStatus.CREATED).json(sold);
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const sales = await salesService.getAll();
    return res.status(httpStatus.OK).json(sales);
  } catch (err) {
    next(err);
  }
};

module.exports = { createSale, getAll };
