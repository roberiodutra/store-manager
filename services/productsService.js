const productsModel = require('../models/productsModel');
const { nameValidation, productValidation } = require('../middlewares/bodyValidation');

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

const update = async (name, id, res) => {
  const products = await productsModel.getAll();
  const isName = products.map((p) => p.name).includes(name);

  if (productValidation(isName, res)) return;

  await productsModel.update(name, id);

  return { id, name };
};

module.exports = { getAll, getById, add, update };
