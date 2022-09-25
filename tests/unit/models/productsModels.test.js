const sinon = require('sinon');
const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');
const { allProductsResponse, productSearchNameResponse, productCreateResponse, productUpdateBody } = require('../../../__tests__/_dataMock');
const { beforeEach } = require('mocha');

describe('Get All Products Model', () => {
  describe('Exist all products Model', () => {
    beforeEach(() => sinon.restore());
    it('Should return all products Model', async () => {
      sinon.stub(connection, 'query').resolves([allProductsResponse]);
      const products = await productModel.getAllProductModel();
      expect(products).to.be.eql(allProductsResponse);
    }
    );
  })
});

describe('Get Products by Id Model', () => {
  describe('Exist products by Id Model', () => {
    beforeEach(() => sinon.restore());
    it('Should return products by Id Model', async () => {
      sinon.stub(connection, 'query').resolves([productSearchNameResponse]);
      const products = await productModel.getProductByIdModel(1);
      expect([products]).to.be.eql(productSearchNameResponse);
    }
    );
  })
});

describe('Add New Product Model', () => {
  describe('Add product by insertId and name Model', () => {
    beforeEach(() => sinon.restore());
    it('Should return products by insertId and name Model', async () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 4 }]);
      const products = await productModel.addProductModel(productCreateResponse.name);
      expect(products).to.be.eql(productCreateResponse);
    }
    );
  })
});

describe('Edit Product by id Model', () => {
  describe('Edit product by Id and name Model', () => {
    beforeEach(() => sinon.restore());
    it('Should return edited products by id and name Model', async () => {
      const name = productUpdateBody.name;
      const id = productUpdateBody.id;
      sinon.stub(connection, 'query').resolves([productUpdateBody]);
      const products = await productModel.editProductModel(name, id);
      expect(products).to.be.eql(productUpdateBody);
    }
    );
  })
});
