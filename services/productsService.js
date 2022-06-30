const productsModel = require('../models/productsModel');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product[0];
  // Expected: {"id": 1, "name": "Martelo de Thor"}
  // Received: [{"id": 1, "name": "Martelo de Thor"}]
};

const add = async (name) => {
  const createdProduct = await productsModel.add(name);
  const result = { id: createdProduct.insertId, name };
  return result;
};

module.exports = { getAll, getById, add };
