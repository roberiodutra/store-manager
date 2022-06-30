const productsService = require('../services/productsService');

const { httpStatus, errorMessages } = require('../helpers');

const getAll = async (_req, res, next) => {
  try {
    const products = await productsService.getAll();
    return res.status(httpStatus.OK).json(products);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);

    if (!product) {
      return res.status(httpStatus.NOT_FOUND).json(errorMessages.NOT_FOUND);
    }

    return res.status(httpStatus.OK).json(product);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  try {
    const { name } = req.body;
    const createdProduct = await productsService.add(name);
    return res.status(httpStatus.CREATED).json(createdProduct);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, add };
