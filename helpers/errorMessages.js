const errorMessages = {
  INTERNAL_ERROR: { message: 'Error when trying to perform operation' },
  NOT_FOUND: { message: 'Product not found' },
  NAME_REQUIRED: { message: '"name" is required' },
  INVALID_NAME: { message: '"name" length must be at least 5 characters long' },
  ID_REQUIRED: { message: '"productId" is required' },
  QUANTITY_REQUIRED: { message: '"quantity" is required' },
  INVALID_QUANTITY: { message: '"quantity" must be greater than or equal to 1' },
  SALE_N_FOUND: { message: 'Sale not found' },
};

module.exports = errorMessages;
