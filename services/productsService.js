const productsModel = require('../models/productsModel');
const { nameValidation } = require('../middlewares/bodyValidation');

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);
  return product[0];
};

const add = async (name, res) => {
  if (nameValidation(name, res)) return;

  const createdProduct = await productsModel.add(name);
  const result = { id: createdProduct.insertId, name };
  return result;
};

module.exports = { getAll, getById, add };
