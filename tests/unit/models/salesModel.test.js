const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../helpers/connection');
const salesModel = require('../../../models/salesModel');

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
});
