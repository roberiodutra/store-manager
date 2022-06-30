const storeModel = require('../models/storeModel');

const getAll = async () => {
  const products = await storeModel.getAll();
  return products;
};

module.exports = { getAll };
