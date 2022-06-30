const productsService = require('../services/productsService');

const { httpStatus, errorMessages } = require('../helpers');

const getAll = async (_req, res) => {
  try {
    const products = await productsService.getAll();
    return res.status(httpStatus.OK).json(products);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).json(errorMessages.INTERNAL_ERROR);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);

    if (!product) {
      return res.status(httpStatus.NOT_FOUND).json(errorMessages.NOT_FOUND);
    }

    return res.status(httpStatus.OK).json(product);
  } catch (err) {
    console.error(err);
    res.status(httpStatus.INTERNAL_SERVER).json(errorMessages.INTERNAL_ERROR);
  }
};

module.exports = { getAll, getById };
