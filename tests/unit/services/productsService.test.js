const sinon = require("sinon");
const { expect } = require("chai");

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

const {
  allProductsResponse,
  rightProductBody,
} = require('../../../__tests__/_dataMock');

describe('Tests for productsService', () => {
  const sinonStub = (prop, data) => {
    sinon.stub(productsModel, prop).resolves(data);
  }

  describe('getAll service returns', () => {
    beforeEach(() => sinonStub('getAll', allProductsResponse));

    afterEach(() => productsModel.getAll.restore());

    it('Returns an array containing objects', async () => {
      const products = await productsService.getAll();
      expect(products).to.be.a('array');
      products.forEach((prod) => expect(prod)
        .to.be.a('object')
        .to.have.a.property('id' && 'name'));
      expect(products).to.have.ordered.members(allProductsResponse);
    });
  });

  describe('getById service returns', () => {
    beforeEach(() => sinonStub('getById', [allProductsResponse[0]]));

    afterEach(() => productsModel.getById.restore());

    it('Returns an object', async () => {
      const product = await productsService.getById();
      expect(product).to.be.an('object');
      expect(product).to.have.a.property('id' && 'name');
    });
  });

  describe('add service returns', () => {
    beforeEach(() => sinonStub('add', rightProductBody));

    afterEach(() => productsModel.add.restore());

    it('Returns an object', async () => {
      const createdProduct = await productsService.add();
      expect(createdProduct).to.be.an('object');
      expect(createdProduct).to.have.a.property('id' && 'name');
    });
  });
});
