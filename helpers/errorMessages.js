const errorMessages = {
  INTERNAL_ERROR: { message: 'Error when trying to perform operation' },
  NOT_FOUND: { message: 'Product not found' },
  NAME_REQUIRED: { "message": "'name' is required" },
  INVALID_NAME: { "message": "'name' length must be at least 5 characters long" },
};

module.exports = errorMessages;
