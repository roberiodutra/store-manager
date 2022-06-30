const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const productsModel = require('../../../models/productsModel');

const {
  allProductsResponse,
} = require('../../../__tests__/_dataMock');

describe('Tests for productsModel', () => {

  describe('getAll function returns all products', () => {
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves([allProductsResponse]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Returns an array containing objects', async () => {
      const products = await productsModel.getAll();
      expect(products).to.be.an('array').to.contains(allProductsResponse[0]);
    });
  });
});