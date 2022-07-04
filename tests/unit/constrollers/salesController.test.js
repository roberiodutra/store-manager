const sinon = require("sinon");
const { expect } = require("chai");

const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");
const { httpStatus, errorMessages } = require('../../../helpers');

const {
  rightSaleBody,
} = require('../../../__tests__/_dataMock');

describe('Tests for salesController', () => {
  const res = {};
  const req = {};
  const next = sinon.stub().returns();
  const err = errorMessages.INTERNAL_ERROR;

  describe('When calling createSale controller', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'createSale').resolves([]);
    });

    afterEach(() => salesService.createSale.restore());

    it('Is called status code 201', async () => {
      await salesController.createSale(req, res);
      expect(res.status.calledWith(httpStatus.CREATED)).to.be.true;
    });
  });
});
