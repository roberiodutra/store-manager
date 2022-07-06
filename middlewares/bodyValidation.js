const { httpStatus, errorMessages } = require('../helpers');

const nameValidation = (name, res) => {
  switch (true) {
    case !name:
      return res.status(httpStatus.BAD_REQUEST).json(errorMessages.NAME_REQUIRED);
    case name.length < 5:
      return res.status(httpStatus.UNPROCESSABLE).json(errorMessages.INVALID_NAME);
    default:
      return false;
  }
};

const productId = (isId, res) => {
  switch (true) {
    case !isId:
      return res.status(httpStatus.NOT_FOUND).json(errorMessages.NOT_FOUND);
    default:
      return false;
  }
};

const quantity = (sales, res) => {
  switch (true) {
    case sales.some((b) => b.quantity === undefined):
      return res.status(httpStatus.BAD_REQUEST).json(errorMessages.QUANTITY_REQUIRED);
    case sales.some((b) => b.quantity <= 0):
      return res.status(httpStatus.UNPROCESSABLE).json(errorMessages.INVALID_QUANTITY);
    default:
      return false;
  }
};

const idValidation = (sales, prodId, saleId, res) => {
  switch (true) {
    case !saleId:
      return res.status(httpStatus.NOT_FOUND).json(errorMessages.SALE_N_FOUND);
    case sales[0].productId !== undefined && !prodId:
      return res.status(httpStatus.NOT_FOUND).json(errorMessages.NOT_FOUND);
    case sales.some((b) => b.productId === undefined):
      return res.status(httpStatus.BAD_REQUEST).json(errorMessages.ID_REQUIRED);
    default:
      return false;
  }
};

module.exports = {
  nameValidation,
  productId,
  quantity,
  idValidation,
};
