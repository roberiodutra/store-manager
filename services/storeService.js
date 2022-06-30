const storeModel = require('../models/storeModel');

const getAll = async () => {
  const products = await storeModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await storeModel.getById(id);
  return product[0];
  //Expected: {"id": 1, "name": "Martelo de Thor"}
  //Received: [{"id": 1, "name": "Martelo de Thor"}]
};

module.exports = { getAll, getById };
