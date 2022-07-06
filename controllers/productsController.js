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
    const createdProduct = await productsService.add(name, res);
    return res.status(httpStatus.CREATED).json(createdProduct);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updatedProduct = await productsService.update(name, id, res);
    return res.status(httpStatus.OK).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productsService.remove(id);
    return res.status(httpStatus.NO_CONTENT).end();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, add, update, remove };
