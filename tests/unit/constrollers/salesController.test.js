const sinon = require("sinon");
const { expect } = require("chai");

const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");
const { httpStatus, errorMessages } = require('../../../helpers');

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

  describe('Test createSale controller catch error', () => {
    beforeEach(() => {
      sinon.stub(salesService, 'createSale').throws(err);
    });

    afterEach(() => salesService.createSale.restore());

    it('Returns an error', async () => {
      await salesController.createSale(req, res, next);
      expect(sinon.assert.calledWith(next, sinon.match(err)));
    });
  });

  describe('When calling getAll controller', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves([]);
    });

    afterEach(() => salesService.getAll.restore());

    it('Is called status code 200', async () => {
      await salesController.getAll(req, res);
      expect(res.status.calledWith(httpStatus.OK)).to.be.true;
    });
  });

  describe('Test getAll controller catch error', () => {
    beforeEach(() => {
      sinon.stub(salesService, 'getAll').throws(err);
    });

    afterEach(() => salesService.getAll.restore());

    it('Returns an error', async () => {
      await salesController.getAll(req, res, next);
      expect(sinon.assert.calledWith(next, sinon.match(err)));
    });
  });
});
