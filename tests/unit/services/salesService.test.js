const sinon = require("sinon");
const { expect } = require("chai");

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const productsModel = require('../../../models/productsModel');
const { httpStatus, errorMessages } = require('../../../helpers');
const { productId, quantity, idValidation } = require('../../../middlewares/bodyValidation');

const {
  saleCreateResponse,
  allProductsResponse,
  wrongSaleNotProductIdBody,
  nonexistentProductIdBody,
  wrongSaleNotQuantityBody,
  rightSaleBody,
  wrongZeroQuantityBody,
  allSales,
  specificSale,
  nonexistentProductIdBody2,
} = require('../../unit/mockData');

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
      expect(quantity(rightSaleBody, res)).to.be.false;
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

    it('Validation returns quantity required', async () => {
      quantity(wrongSaleNotQuantityBody, res);
      expect(res.json.calledWith(errorMessages.QUANTITY_REQUIRED)).to.be.true;
    });

    it('Validation returns invalid quantity', async () => {
      quantity(wrongZeroQuantityBody, res);
      expect(res.json.calledWith(errorMessages.INVALID_QUANTITY)).to.be.true;
    });
  });

  describe('getAll service returns', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'getAll').resolves(allSales);
    });

    afterEach(() => {
      salesModel.getAll.restore();
    });

    it('Returns an array of objects', async () => {
      const sales = await salesService.getAll();
      expect(sales).to.be.a('array');
      sales.forEach((s) => expect(s)
        .to.be.a('object')
        .to.have.a.property('saleId' && 'productId' && 'quantity' && 'date'));
    });
  });

  describe('getById service returns', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'getById').resolves(specificSale);
    });

    afterEach(() => {
      salesModel.getById.restore();
    });

    it('Returns an array of objects', async () => {
      const sale = await salesService.getById();
      expect(sale).to.be.a('array');
      sale.forEach((s) => expect(s)
        .to.be.a('object')
        .to.have.a.property('productId' && 'quantity' && 'date'));
    });
  });

  describe('Calling remove service', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'remove').resolves([]);
    });

    afterEach(() => {
      salesModel.remove.restore();
    });

    it('Call remove sales model', async () => {
      await salesService.remove();
      expect(salesModel.remove.called).to.be.true;
    });
  });

  describe('Calling update service', () => {
    beforeEach(() => {
      sinon.stub(salesModel, 'update').resolves([]);
      sinon.stub(salesModel, 'getAll').resolves(allSales);
      sinon.stub(productsModel, 'getAll').resolves(allProductsResponse);
    });

    afterEach(() => {
      salesModel.update.restore();
      salesModel.getAll.restore();
      productsModel.getAll.restore();
    });

    it('Call update sales model', async () => {
      await salesService.update(rightSaleBody, '1');
      expect(salesModel.update.called).to.be.true;
    });

    it('Returns an object', async () => {
      const sale = await salesService.update(rightSaleBody, '1');
      expect(sale).to.be.a('object');
      expect(sale).to.have.a.property('saleId');
    });

    it('With wrong quantity, is called status code 400', async () => {
      await salesService.update(wrongSaleNotQuantityBody, '1', res);
      expect(res.status.calledWith(httpStatus.BAD_REQUEST)).to.be.true;
    });

    it('With wrong productId, is called status code 400', async () => {
      await salesService.update(nonexistentProductIdBody2, '1', res);
      expect(res.status.calledWith(httpStatus.BAD_REQUEST)).to.be.true;
    });
    
    it('With wrong productId, is called status code 404', async () => {
      await salesService.update(nonexistentProductIdBody, '1', res);
      expect(res.status.calledWith(httpStatus.NOT_FOUND)).to.be.true;
    });

    it('Is called status code 422', async () => {
      await salesService.update(wrongZeroQuantityBody, '1', res);
      expect(res.status.calledWith(httpStatus.UNPROCESSABLE)).to.be.true;
    });

    it('With wrong saleId, error message', async () => {
      await salesService.update(rightSaleBody, 999, res);
      expect(res.json.calledWith(errorMessages.SALE_N_FOUND)).to.be.true;
    });
  });
});
