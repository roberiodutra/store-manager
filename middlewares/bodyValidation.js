const { httpStatus, errorMessages } = require('../helpers');

const name = (name, res) => {
  switch (true) {
  case !name:
    return res.status(httpStatus.BAD_REQUEST).json(errorMessages.NAME_REQUIRED);
  case name.length < 5:
    return res.status(httpStatus.UNPROCESSABLE).json(errorMessages.INVALID_NAME);
  default:
    return false;
  }
};

const sales = (sales, res) => {
  switch (true) {
  case sales.some((b) => b.productId === undefined):
    return res.status(httpStatus.BAD_REQUEST).json(errorMessages.ID_REQUIRED);
  case sales.some((b) => b.quantity === undefined):
    return res.status(httpStatus.BAD_REQUEST).json(errorMessages.QUANTITY_REQUIRED);
  case sales.some((b) => b.quantity <= 0):
    return res.status(httpStatus.UNPROCESSABLE).json(errorMessages.INVALID_QUANTITY);
  default:
    return false;
  }
}

module.exports = { name, sales };
