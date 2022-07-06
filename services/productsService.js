const productsModel = require('../models/productsModel');
const { nameValidation, productId } = require('../middlewares/bodyValidation');

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
  const isId = products.map((p) => p.id).includes(+id);

  if (nameValidation(name, res) || productId(isId, res)) return;

  await productsModel.update(name, id);

  return { id, name };
};

const remove = async (id, res) => {
  const products = await productsModel.getAll();
  const isId = products.map((p) => p.id).includes(+id);

  if (productId(isId, res)) return;

  await productsModel.remove(id);
};

const query = async (term) => {
  const found = await productsModel.query(term);
  return found;
};

module.exports = { getAll, getById, add, update, remove, query };
