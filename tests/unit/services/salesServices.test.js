const sinon = require('sinon');
const { expect } = require('chai');
const saleService = require('../../../services/saleService');
const saleModel = require('../../../models/saleModels');
const { saleCreateResponse } = require('../../../__tests__/_dataMock');
const { beforeEach } = require('mocha');

describe('Get All Sales service', () => {
  describe('Exist all sales service', () => {
    beforeEach(() => sinon.restore());
    it('Should return all sales service', async () => {
      sinon.stub(saleModel, 'getAllSalesModel').resolves(saleCreateResponse);
      const products = await saleService.getAllSaleService();
      expect(products).to.be.eql(saleCreateResponse);
    }
    );
  })
});

describe('Get Sale by Id Service', () => {
  describe('Exist sale by Id Service', () => {
    beforeEach(() => sinon.restore());
    it('Should return sale by Id Service', async () => {
      sinon.stub(saleModel, 'getAllSaleByIdModel').resolves([saleCreateResponse]);
      const products = await saleService.getAllSaleByIdService(1);
      expect(products).to.be.eql([saleCreateResponse]);
    }
    );
  })
});
