const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");
const { httpStatus, errorMessages } = require('../../../helpers');

describe('Tests for productsController', () => {
  const res = {};
  const req = {};
  const next = sinon.stub().returns();
  const err = errorMessages.INTERNAL_ERROR;

  describe('When calling getAll controller', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves([]);
    });

    afterEach(() => productsService.getAll.restore());

    it('Is called status code 200', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(httpStatus.OK)).to.be.equal(true);
    });
  });

  describe('Test getAll controller catch error', () => {
    beforeEach(() => {
      sinon.stub(productsService, 'getAll').throws(err);
    });

    afterEach(() => productsService.getAll.restore());

    it('Returns an error', async () => {
      await productsController.getAll(req, res, next);
      expect(sinon.assert.calledWith(next, sinon.match(err)));
    });
  });
});
