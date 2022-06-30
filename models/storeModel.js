const { connection } = require('../helpers');

const getAll = async () => {
  const [products] = await connection.execute(`
    SELECT *
      FROM StoreManager.products
        ORDER BY id ASC`);
  return products;
};

module.exports = { getAll };
