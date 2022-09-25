const sinon = require('sinon');
const { expect } = require('chai');
const saleController = require('../../../controllers/saleController');
const saleService = require('../../../services/saleService');
const { saleCreateResponse } = require('../../../__tests__/_dataMock');
const { beforeEach } = require('mocha');

describe('Get All Sales Controller', () => {
  describe('Exist all sales controller', () => {
    beforeEach(() => sinon.restore());
    it('1) Should return all sales controller', async () => {
      sinon.stub(saleController, 'getAllSalesController').resolves(saleCreateResponse);
      const products = await saleController.getAllSalesController();
      expect(products).to.be.eql(saleCreateResponse);
    });
    it('2) Should return status 200 controller', async () => {
      sinon.stub(saleService, 'getAllSaleService').resolves(saleCreateResponse);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.message = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      const product = await saleService.getAllSaleService();
      expect(product).to.be.eql(saleCreateResponse);
      await saleController.getAllSalesController(req, res);
      expect(res.status.calledWith(200)).to.be.eql(true);
    });
    it('3) Should return status 400 controller', async () => {
      const productLista = null;
      sinon.stub(saleService, 'getAllSaleService').resolves(productLista);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.message = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      const products = await saleService.getAllSaleService();
      expect(products).to.be.eql(productLista);
      await saleController.getAllSalesController(req, res);
      expect(res.status.calledWith(400)).to.be.eql(true);
    });
  });
});

describe('Get Sale by Id Controller', () => {
  describe('Exist Sale by Id Controller', () => {
    beforeEach(() => sinon.restore());
    it('Should return Sale by Id Controller', async () => {
      sinon.stub(saleController, 'getAllSaleByIdController').resolves([saleCreateResponse]);
      const sale = await saleController.getAllSaleByIdController(1);
      expect(sale).to.be.eql([saleCreateResponse]);
    });
    it('1) Should return status: 404 and  message: "Sale not found" controller', async () => {
      sinon.stub(saleService, 'getAllSaleByIdService').resolves(null);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 1 };
      await saleController.getAllSaleByIdController(req, res);
      expect(res.status.calledWith(404)).to.be.eql(true);
      expect(res.json.calledWith({ message: 'Sale not found' })).to.be.eql(true);
    });
    it('2) Should return status 200 controller', async () => {
      sinon.stub(saleService, 'getAllSaleByIdService').resolves(saleCreateResponse);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.params = { id: 3 };
      await saleController.getAllSaleByIdController(req, res);
      expect(res.status.calledWith(200)).to.be.eql(true);
    });
  });
});

describe('Add Sale Controller', () => {
  describe('Exist Add Sale Controller', () => {
    beforeEach(() => sinon.restore());
    it('Should return Add Sale Controller', async () => {
      sinon.stub(saleController, 'addSaleController').resolves(saleCreateResponse);
      const sale = await saleController.addSaleController(saleCreateResponse);
      expect(sale).to.be.eql(saleCreateResponse);
    });
    it('1) Should return status: 404 and  message: "Product not found" controller', async () => {
      const validated = true;
      sinon.stub(saleService, 'addSaleService').resolves(validated === false);
      const req = {};
      const res = {};
      req.body = {
        id: 3,
        itemsSold: [
          { productId: '', quantity: 1 },
          { productId: 2, quantity: 5 },
        ]
      };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      await saleController.addSaleController(req, res);
      expect(res.status.calledWith(404)).to.be.eql(false);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.eql(false);
    });
    it('1) Should return status: 500 and  message: "Internal server error" controller', async () => {
      sinon.stub(saleService, 'addSaleService').resolves(false);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      await saleController.addSaleController(req, res);
      expect(res.status.calledWith(500)).to.be.eql(true);
      expect(res.json.calledWith({ message: 'Internal server error' })).to.be.eql(true);
    });
    it('2) Should return status 200 controller', async () => {
      sinon.stub(saleService, 'addSaleService').resolves(true);
      const req = {};
      const res = {};
      req.body = saleCreateResponse;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      await saleController.addSaleController(req, res);
      expect(res.status.calledWith(201)).to.be.eql(false);
    });
  });
});
