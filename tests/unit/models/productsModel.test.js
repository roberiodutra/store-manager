const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const productsModel = require('../../../models/productsModel');

const {
  allProductsResponse,
  productCreateResponse,
} = require('../../unit/mockData');

describe('Tests for productsModel', () => {
  afterEach(() => connection.execute.restore());

  const sinonStub = (data) => {
    sinon.stub(connection, 'execute').resolves([data]);
  }

  describe('getAll model returns', () => {
    beforeEach(() => sinonStub(allProductsResponse));

    it('Returns an array containing objects', async () => {
      const products = await productsModel.getAll();
      expect(products).to.be.an('array').to.contains(allProductsResponse[0]);
      expect(products).to.have.ordered.members(allProductsResponse);
    });
  });

  describe('getById model returns', () => {
    beforeEach(() => sinonStub(allProductsResponse[0]));

    it('Returns an object', async () => {
      const product = await productsModel.getById();
      expect(product).to.be.a('object');
      expect(product).to.have.a.property('id' && 'name');
    });
  });

  describe('add model returns', () => {
    beforeEach(() => sinonStub(productCreateResponse));

    it('Returns an object', async () => {
      const createdProduct = await productsModel.add();
      expect(createdProduct).to.be.a('object');
      expect(createdProduct).to.have.a.property('id' && 'name');
    });
  });

  describe('Calling update model', () => {
    beforeEach(() => sinonStub());

    it('Call connection execute', async () => {
      await productsModel.update();
      expect(connection.execute.called).to.be.true;
    });
  });

  describe('Calling remove model', () => {
    beforeEach(() => sinonStub());

    it('Call connection execute', async () => {
      await productsModel.remove();
      expect(connection.execute.called).to.be.true;
    });
  });
});
