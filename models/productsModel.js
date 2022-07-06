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

const query = async (name) => {
  const [found] = await connection.execute(
    `SELECT *
      FROM StoreManager.products
        WHERE name 
          LIKE CONCAT("%", ? , "%")`,
    [name],
  );
  console.log(found);
  return found;
};

module.exports = { getAll, getById, add, update, remove, query };
