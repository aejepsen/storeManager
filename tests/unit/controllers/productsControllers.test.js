const sinon = require('sinon');
const { expect } = require('chai');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');
const { allProductsResponse, productSearchNameResponse, productCreateResponse, productUpdateBody, wrongSizeProductBody } = require('../../../__tests__/_dataMock');
const { beforeEach } = require('mocha');

describe('Get All Products Controller', () => {
  describe('Exist all products controller', () => {
    beforeEach(() => sinon.restore());
    it('1) Should return all products controller', async () => {
      sinon.stub(productController, 'getAllProductController').resolves(productSearchNameResponse);
      const products = await productController.getAllProductController();
      expect(products).to.be.eql(productSearchNameResponse);
    });
    it('2) Should return status 200 controller', async () => {
      sinon.stub(productService, 'getAllProductService').resolves(productSearchNameResponse);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.message = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      const product = await productService.getAllProductService();
      expect(product).to.be.eql(productSearchNameResponse);
      await productController.getAllProductController(req, res);
      expect(res.status.calledWith(200)).to.be.eql(true);
    });
    it('3) Should return status 400 controller', async () => {
      const productLista = null;
      sinon.stub(productService, 'getAllProductService').resolves(productLista);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.message = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      const product = await productService.getAllProductService();
      expect(product).to.be.eql(productLista);
      await productController.getAllProductController(req, res);
      expect(res.status.calledWith(400)).to.be.true;
    });
  });
});

  describe('Get Products by Id Controller', () => {
    describe('Exist products by Id Controller', () => {
      beforeEach(() => sinon.restore());
      it('Should return products by Id Controller', async () => {
        sinon.stub(productController, 'getProductByIdController').resolves([productSearchNameResponse]);
        const products = await productController.getProductByIdController(1);
        expect(products).to.be.eql([productSearchNameResponse]);
      });
      it('1) Should return status: 404 and  message: "No products found." controller', async () => {
        sinon.stub(productService, 'getProductByIdService').resolves(null);
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        req.params = { id: 1 };
        await productController.getProductByIdController(req, res);
        expect(res.status.calledWith(404)).to.be.eql(true);
        expect(res.json.calledWith({ message: 'Product not found' })).to.be.eql(true);
      });
      it('2) Should return status 200 controller', async () => {
        sinon.stub(productService, 'getProductByIdService').resolves(productSearchNameResponse);
        const req = {};
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub();
        req.params = { id: 1 };
        await productController.getProductByIdController(req, res);
        expect(res.status.calledWith(200)).to.be.eql(true);
      });
    });
  });

describe('Add Product Controller', () => {
  describe('Exist name add product controller', () => {
    beforeEach(() => sinon.restore());
    it('Should return add product controller', async () => {
      sinon.stub(productController, 'addProductController').resolves(productCreateResponse);
      const products = await productController.addProductController(productCreateResponse);
      expect(products).to.be.eql(productCreateResponse);
    });
    it('1) Should return status: 400 and  message: ""name" is required', async () => {
      sinon.stub(productService, 'addProductService').resolves(null);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.body = { name: "" };
      await productController.addProductController(req, res);
      expect(res.status.calledWith(400)).to.be.eql(true);
      expect(res.json.calledWith({ message: '"name" is required' })).to.be.eql(true);
    });
    it('1) Should return status: 422 and  message: "name" length must be at least 5 characters long', async () => {
      sinon.stub(productService, 'addProductService').resolves(true);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.body = { name: "nam" };
      await productController.addProductController(req, res);
      expect(res.status.calledWith(422)).to.be.eql(true);
      expect(res.json.calledWith({ message: '"name" length must be at least 5 characters long' })).to.be.eql(true);
    });
    it('2) Should return status 201 controller', async () => {
      sinon.stub(productService, 'addProductService').resolves(productCreateResponse);
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
      req.body = productCreateResponse;
      await productController.addProductController(req, res);
      expect(res.status.calledWith(201)).to.be.eql(true);
    });
  });
});
