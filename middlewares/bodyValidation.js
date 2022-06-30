const { httpStatus, errorMessages } = require('../helpers');

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  switch (true) {
  case !name:
    return res.status(httpStatus.BAD_REQUEST).json(errorMessages.NAME_REQUIRED);
  case name.length < 5:
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json(errorMessages.INVALID_NAME);
  default:
    next();
  }
};

module.exports = [
  nameValidation,
];
