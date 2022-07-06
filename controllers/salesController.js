const salesService = require('../services/salesService');

const { httpStatus, errorMessages } = require('../helpers');

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

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    if (sale.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json(errorMessages.SALE_N_FOUND);
    }

    return res.status(httpStatus.OK).json(sale);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await salesService.getById(id);

    if (sale.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json(errorMessages.SALE_N_FOUND);
    }

    await salesService.remove(id);
    return res.status(httpStatus.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { createSale, getAll, getById, remove };
