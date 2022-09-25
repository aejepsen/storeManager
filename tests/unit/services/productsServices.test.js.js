const sinon = require('sinon');
const { expect } = require('chai');
const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');
const { allProductsResponse, productSearchNameResponse, productCreateResponse, productUpdateBody } = require('../../../__tests__/_dataMock');
const { beforeEach } = require('mocha');

describe('Get All Products Service', () => {
  describe('Exist all products service', () => {
    beforeEach(() => sinon.restore());
    it('Should return all products service', async () => {
      sinon.stub(productModel, 'getAllProductModel' ).resolves([allProductsResponse]);
      const products = await productService.getAllProductService();
      expect(products).to.be.eql([allProductsResponse]);
    }
    );
  })
});

describe('Get Products by Id Service', () => {
  describe('Exist products by Id Service', () => {
    beforeEach(() => sinon.restore());
    it('Should return products by Id Service', async () => {
      sinon.stub(productModel, 'getProductByIdModel').resolves([productSearchNameResponse]);
      const products = await productService.getProductByIdService(1);
      expect(products).to.be.eql([productSearchNameResponse]);
    }
    );
  })
});

describe('Create Products Service', () => {
  describe('Exist create products service', () => {
    beforeEach(() => sinon.restore());
    it('Should return create products service', async () => {
      sinon.stub(productModel, 'addProductModel').resolves([productCreateResponse]);
      const products = await productService.addProductService(productCreateResponse);
      expect(products).to.be.eql([productCreateResponse]);
    });
  })
});
