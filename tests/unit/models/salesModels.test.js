const sinon = require('sinon');
const { expect } = require('chai');
const saleModel = require('../../../models/saleModels');
const connection = require('../../../models/connection');
const { saleCreateResponse, productSearchNameResponse } = require('../../../__tests__/_dataMock');
const { beforeEach } = require('mocha');

describe('Add New Sale Model', () => {
  describe('Add newSale by id and productId and quantity Model', () => {
    beforeEach(() => sinon.restore());
    it('Should return products by id, itemsSold, productId, quantity Model', async () => {
      sinon.stub(connection, 'query').resolves([saleCreateResponse]);
      const products = await saleModel.saleAddModel(saleCreateResponse.itemsSold);
      expect(products.itemsSold).to.be.eql(saleCreateResponse.itemsSold);
    }
    );
  })
});

describe('Get All Sales Model', () => {
  describe('Exist all sales Model', () => {
    beforeEach(() => sinon.restore());
    it('Should return all sales Model', async () => {
      sinon.stub(connection, 'query').resolves([saleModel.getAllSalesModel]);
      const products = await saleModel.getAllSalesModel();
      expect(products).to.be.eql(saleModel.getAllSalesModel);
    }
    );
  })
});

describe('Get Sales by Id Model', () => {
  describe('Exist Sales by Id Model', () => {
    beforeEach(() => sinon.restore());
    it('Should return Sales by Id Model', async () => {
      sinon.stub(connection, 'query').resolves([saleCreateResponse]);
      const products = await saleModel.getAllSaleByIdModel(1);
      expect(products).to.be.eql(saleCreateResponse);
    }
    );
  })
});
