const sinon = require("sinon");
const { expect } = require("chai");

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const productsModel = require('../../../models/productsModel');
const { httpStatus } = require('../../../helpers');
const { productId } = require('../../../middlewares/bodyValidation');

const {
  saleCreateResponse,
  allProductsResponse,
  wrongSaleNotProductIdBody,
  nonexistentProductIdBody,
  wrongSaleNotQuantityBody,
  rightSaleBody,
  wrongZeroQuantityBody,
} = require('../../../__tests__/_dataMock');

describe('Tests for salesService', () => {
  const res = {};

  describe('createSale service returns', () => {
    beforeEach(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(salesModel, 'createSale').resolves([saleCreateResponse]);
      sinon.stub(productsModel, 'getAll').resolves([allProductsResponse]);
      sinon.stub(salesModel, 'addSoldProducts').resolves();
    });

    afterEach(() => {
      salesModel.createSale.restore();
      productsModel.getAll.restore();
      salesModel.addSoldProducts.restore();
    });

    it('Call service createSale', async () => {
      await salesService.createSale(rightSaleBody, res);
      expect(salesModel.createSale.called).to.be.true;
      expect(productId(rightSaleBody, true, res)).to.be.false;
    });

    it('Is called status code 400', async () => {
      await salesService.createSale(wrongSaleNotProductIdBody, res);
      expect(res.status.calledWith(httpStatus.BAD_REQUEST)).to.be.true;
    });

    it('Is called status code 400', async () => {
      await salesService.createSale(wrongSaleNotQuantityBody, res);
      expect(res.status.calledWith(httpStatus.BAD_REQUEST)).to.be.true;
    });

    it('Is called status code 404', async () => {
      await salesService.createSale(nonexistentProductIdBody, res);
      expect(res.status.calledWith(httpStatus.NOT_FOUND)).to.be.true;
    });

    it('Is called status code 422', async () => {
      await salesService.createSale(wrongZeroQuantityBody, res);
      expect(res.status.calledWith(httpStatus.UNPROCESSABLE)).to.be.true;
    });
  });
});
