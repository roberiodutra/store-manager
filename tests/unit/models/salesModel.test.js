const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const salesModel = require('../../../models/salesModel');

const {
  allSales,
  specificSale,
} = require('../../../__tests__/_dataMock');

describe('Tests for salesModel', () => {
  afterEach(() => connection.execute.restore());

  const sinonStub = (data) => {
    sinon.stub(connection, 'execute').resolves([data]);
  }

  describe('createSale model returns', () => {
    beforeEach(() => sinonStub({id: 5}));

    it('Returns an object', async () => {
      const sales = await salesModel.createSale();
      expect(sales).to.have.a.property('id');
    });
  });

  describe('addSoldProducts model connection', () => {
    beforeEach(() => sinonStub());

    it('Call connection execute', async () => {
      await salesModel.addSoldProducts();
      expect(connection.execute.called).to.be.true;
    });
  });

  describe('getAll model returns', () => {
    beforeEach(() => sinonStub(allSales));

    it('Returns an array of objects', async () => {
      const sales = await salesModel.getAll();
      expect(sales).to.be.a('array');
      sales.forEach((s) => expect(s)
        .to.be.a('object')
        .to.have.a.property('saleId' && 'productId' && 'quantity' && 'date'));
    });
  });

  describe('getById model returns', () => {
    beforeEach(() => sinonStub(specificSale));

    it('Returns an array of objects', async () => {
      const sale = await salesModel.getById();
      expect(sale).to.be.a('array');
      sale.forEach((s) => expect(s)
        .to.be.a('object')
        .to.have.a.property('productId' && 'quantity' && 'date'));
    });
  });
});
