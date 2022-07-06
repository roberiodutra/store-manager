const salesModel = require('../models/salesModel');
const { productId, quantity, saleIdValidation } = require('../middlewares/bodyValidation');
const productsModel = require('../models/productsModel');

const createSale = async (sales, res) => {
  const products = await productsModel.getAll();
  const productsIds = products.map(({ id }) => id);
  const salesIds = sales.map((s) => s.productId)
    .every((each) => productsIds.includes(each));

  if (productId(sales, salesIds, res) || quantity(sales, res)) return;

  const saleId = await salesModel.createSale();
  await Promise.all(
    sales.map(async (sale) => {
      await salesModel.addSoldProducts(
        saleId.id, sale.productId, sale.quantity,
      );
    }),
  );
  const sold = { id: saleId.id, itemsSold: sales };
  return sold;
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

const remove = async (id) => {
  await salesModel.remove(id);
};

const update = async (sales, saleId, res) => {
  const products = await productsModel.getAll();
  const productsIds = products.map(({ id }) => id);

  const allSales = await salesModel.getAll();
  const allSalesIds = allSales.map((s) => s.saleId);

  const salesIds = sales.map((s) => s.productId)
    .every((each) => productsIds.includes(each));
  
  const checkBodySaleId = allSalesIds.includes(+saleId);

  if (saleIdValidation(checkBodySaleId, res)
    || productId(sales, salesIds, res)
    || quantity(sales, res)) return;

  await Promise.all(sales.map(async (s) => {
    await salesModel.update(saleId, s.productId, s.quantity);
  }));

  const soldProducts = { saleId, itemsUpdated: sales };
  return soldProducts;
};

module.exports = { createSale, getAll, getById, remove, update };
