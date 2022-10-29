const { expect } = require("chai");
const sinon = require("sinon");
const { products } = require("../../../src/models");
const services = require("../../../src/services");
const { productFromDb } = require("./mocks/products.mock");

describe("Testes de unidade service de produtos", function () {
  afterEach(() => {
    sinon.restore();
  });
  it("reucuperando um produto a partir do seu id", async function () {
    sinon.stub(products, "findById").resolves(productFromDb);

    const result = await services.products.getForId(1);

    expect(result).to.be.deep.equal(productFromDb);
  });

  it("retorna erro ao buscar produto inexistente", async function () {
    sinon.stub(products, "findById").resolves(undefined);

    const id = 999;
    const error = await services.products.getForId(id);

    expect(error).to.be.equal(undefined);
  });

  it("inserindo um produto com sucesso", async function () {
    sinon.stub(products, "insert").resolves(42);
    const name = "seila";
    const result = await services.products.insert(name);
    expect(result.status).to.be.equal(201);
    expect(result.message.id).to.be.equal(42);
    expect(result.message.name).to.be.equal("seila");
  });

  it("inserindo um produto com erro", async function () {
    sinon.stub(products, "insert").resolves(null);
    const name = "";
    const result = await services.products.insert(name);
    expect(result.status).to.be.equal(400);
    expect(result.message.message).to.be.equal('"name" is required');
  });
});
