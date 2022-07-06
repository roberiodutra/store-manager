const sinon = require("sinon");
const { expect } = require("chai");

const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");
const { httpStatus, errorMessages } = require('../../../helpers');

const {
  specificSale,
  allSales,
} = require('../../unit/mockData');

describe('Tests for salesController', () => {
  const res = {};
  const req = {};
  const next = sinon.stub().returns();
  const err = errorMessages.INTERNAL_ERROR;

  describe('Calling createSale controller', () => {
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

  describe('Calling getAll controller', () => {
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

  describe('Calling getById controller', () => {
    beforeEach(() => {
      req.params = 3;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves([specificSale]);
    });

    afterEach(() => salesService.getById.restore());

    it('Is called status code 200', async () => {
      await salesController.getById(req, res);
      expect(res.status.calledWith(httpStatus.OK)).to.be.true;
    });
  });

  describe('Calling getById controller with incorrect id', () => {
    beforeEach(() => {
      req.params = 9999;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves([]);
    });

    afterEach(() => salesService.getById.restore());

    it('Is called status code 404', async () => {
      await salesController.getById(req, res);
      expect(res.status.calledWith(httpStatus.NOT_FOUND)).to.be.true;
    });
  });

  describe('Test getById controller catch error', () => {
    beforeEach(() => {
      sinon.stub(salesService, 'getById').throws(err);
    });

    afterEach(() => salesService.getById.restore());

    it('Returns an error', async () => {
      await salesController.getById(req, res, next);
      expect(sinon.assert.calledWith(next, sinon.match(err)));
    });
  });

  describe('Calling remove controller', () => {
    beforeEach(() => {
      req.params = 1;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'remove').resolves([]);
      sinon.stub(salesService, 'getById').resolves(allSales);
    });

    afterEach(() => {
      salesService.remove.restore();
      salesService.getById.restore();
    });

    it('Is called status code 204', async () => {
      await salesController.remove(req, res, next);
      expect(res.status.calledWith(httpStatus.NO_CONTENT)).to.be.true;
    });
  });

  describe('Calling remove controller with non-existent id', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'getById').resolves([]);
    });

    afterEach(() => {
      salesService.getById.restore();
    });

    it('Is called status code 400', async () => {
      await salesController.remove(req, res, next);
      expect(res.status.calledWith(httpStatus.NOT_FOUND)).to.be.true;
      expect(res.json.calledWith(errorMessages.SALE_N_FOUND)).to.be.true;
    });
  });

  describe('Test remove controller catch error', () => {
    beforeEach(() => {
      sinon.stub(salesService, 'remove').throws(err);
    });

    afterEach(() => salesService.remove.restore());

    it('Returns an error', async () => {
      await salesController.remove(req, res, next);
      expect(sinon.assert.calledWith(next, sinon.match(err)));
    });
  });

  describe('Calling update controller', () => {
    beforeEach(() => {
      req.params = 1;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesService, 'update').resolves([]);
    });

    afterEach(() => {
      salesService.update.restore();
    });

    it('Is called status code 200', async () => {
      await salesController.update(req, res, next);
      expect(res.status.calledWith(httpStatus.OK)).to.be.true;
    });
  });

    describe('Test update controller catch error', () => {
    beforeEach(() => {
      sinon.stub(salesService, 'update').throws(err);
    });

    afterEach(() => salesService.update.restore());

    it('Returns an error', async () => {
      await salesController.update(req, res, next);
      expect(sinon.assert.calledWith(next, sinon.match(err)));
    });
  });
});
