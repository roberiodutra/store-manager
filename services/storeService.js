const storeModel = require('../models/storeModel');

const getAll = async () => {
  const products = await storeModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await storeModel.getById(id);
  return product;
};

module.exports = { getAll, getById };
