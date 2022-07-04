const sinon = require("sinon");
const { expect } = require("chai");

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const productsModel = require('../../../models/productsModel');
const { httpStatus, errorMessages } = require('../../../helpers');
const { productId, quantity } = require('../../../middlewares/bodyValidation');

const {
  saleCreateResponse,
  allProductsResponse,
  wrongSaleNotProductIdBody,
  nonexistentProductIdBody,
  wrongSaleNotQuantityBody,
  rightSaleBody,
  wrongZeroQuantityBody,
} = require('../../../__tests__/_dataMock');

const allSales = [
  { saleId: 1, date: '2021-09-09', productId: 1, quantity: 2 },
  { saleId: 1, date: '2021-09-09', productId: 2, quantity: 2 },
];

const specificSale = [
  { date: '2021-09-09', productId: 1, quantity: 2 },
  { date: '2021-09-09', productId: 2, quantity: 2 },
];

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

    it('Validation returns not found', async () => {
      productId(rightSaleBody, false, res);
      expect(res.json.calledWith(errorMessages.NOT_FOUND)).to.be.true;
    });

    it('Validation returns ID required', async () => {
      productId(wrongSaleNotProductIdBody, true, res);
      expect(res.json.calledWith(errorMessages.ID_REQUIRED)).to.be.true;
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
});
