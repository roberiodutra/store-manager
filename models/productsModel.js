const { connection } = require('../helpers');

const getAll = async () => {
  const [products] = await connection.execute(
    `SELECT *
      FROM StoreManager.products
        ORDER BY id ASC`,
  );
  return products;
};

const getById = async (id) => {
  const [product] = await connection.execute(
    `SELECT *
      FROM StoreManager.products
        WHERE id = ?`,
    [id],
  );
  return product;
};

const add = async (name) => {
  const [createdProduct] = await connection.execute(
    `INSERT INTO StoreManager.products
      (name) VALUES (?)`,
    [name],
  );
  return createdProduct;
};

const update = async (name, id) => {
  await connection.execute(
    `UPDATE StoreManager.products
      SET name = ?
        WHERE id = ?`,
    [name, id],
  );
};

const remove = async (id) => {
  await connection.execute(
    `DELETE FROM StoreManager.products
      WHERE id = ?`,
    [id],
  );
};

module.exports = { getAll, getById, add, update, remove };
