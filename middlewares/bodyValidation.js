const { httpStatus, errorMessages } = require('../helpers');

const name = (name, res) => {
  switch (true) {
  case !name:
    return res.status(httpStatus.BAD_REQUEST).json(errorMessages.NAME_REQUIRED);
  case name.length < 5:
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(errorMessages.INVALID_NAME);
  default:
    return false;
  }
};

const productId = (sales, res) => {
  const bool = sales.filter((body) => body.productId === undefined);
  bool ? res.status(httpStatus.BAD_REQUEST).json(errorMessages.ID_REQUIRED) : bool;
}

module.exports = { name, productId };
