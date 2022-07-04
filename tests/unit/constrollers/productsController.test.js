const sinon = require("sinon");
const { expect } = require("chai");

const productsService = require("../../../services/productsService");
const productsController = require("../../../controllers/productsController");
const { httpStatus, errorMessages } = require('../../../helpers');

const {
  rightProductBody,
  productCreateResponse,
} = require('../../../__tests__/_dataMock');

describe('Tests for productsController', () => {
  const res = {};
  const req = {};
  const next = sinon.stub().returns();
  const err = errorMessages.INTERNAL_ERROR;

  describe('Calling getAll controller', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getAll').resolves([]);
    });

    afterEach(() => productsService.getAll.restore());

    it('Is called status code 200', async () => {
      await productsController.getAll(req, res);
      expect(res.status.calledWith(httpStatus.OK)).to.be.true;
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

  describe('Calling getById controller', () => {
    beforeEach(() => {
      req.params = '1';
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves({});
    });

    afterEach(() => productsService.getById.restore());

    it('Is called status code 200', async () => {
      await productsController.getById(req, res, next);
      expect(res.status.calledWith(httpStatus.OK)).to.be.true;
    });
  });

  describe('Calling getById controller with non-existent id', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'getById').resolves();
    });

    afterEach(() => productsService.getById.restore());

    it('Is called status code 400', async () => {
      await productsController.getById(req, res, next);
      expect(res.status.calledWith(httpStatus.NOT_FOUND)).to.be.true;
      expect(res.json.calledWith(errorMessages.NOT_FOUND)).to.be.true;
    });
  });

  describe('Test getById controller catch error', () => {
    beforeEach(() => {
      sinon.stub(productsService, 'getById').throws(err);
    });

    afterEach(() => productsService.getById.restore());

    it('Returns an error', async () => {
      await productsController.getById(req, res, next);
      expect(sinon.assert.calledWith(next, sinon.match(err)));
    });
  });

  describe('Calling add controller', () => {
    beforeEach(() => {
      req.body = rightProductBody;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productsService, 'add').resolves(productCreateResponse);
    });

    afterEach(() => productsService.add.restore());

    it('Is called status code 201', async () => {
      await productsController.add(req, res, next);
      expect(res.status.calledWith(httpStatus.CREATED)).to.be.true;
    });
  });

  describe('Test add controller catch error', () => {
    beforeEach(() => {
      sinon.stub(productsService, 'add').throws(err);
    });

    afterEach(() => productsService.add.restore());

    it('Returns an error', async () => {
      await productsController.add(req, res, next);
      expect(sinon.assert.calledWith(next, sinon.match(err)));
    });
  });
});
