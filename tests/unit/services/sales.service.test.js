const { expect } = require("chai");
const sinon = require("sinon");

const service = require("../../../src/services");
const { sales } = require("../../../src/models");
const { salesFromDb, salesId } = require("./mocks/sale.mock");

describe("teste na camada service sales", function () {
  afterEach(() => {
    sinon.restore();
  });

  it("teste se retorna a busca com sucesso", async function () {
    sinon.stub(sales, "findAll").resolves(salesFromDb);
    const result = await service.sales.getAll();
    expect(result.length).to.be.equal(3);
    expect(result[0].productId).to.be.equal(salesFromDb[0].productId);
    expect(result[0].quantity).to.be.equal(salesFromDb[0].quantity);
    expect(result[0].saleId).to.be.equal(salesFromDb[0].saleId);
  });

  it("teste se retorna a busca pelo id com sucesso", async function () {
    sinon.stub(sales, "findById").resolves([salesId]);

    const result = await service.sales.getById(1);
    expect(result.ress.length).to.be.equal(2);
    expect(result.ress[0].productId).to.be.equal(1);
    expect(result.ress[0].quantity).to.be.equal(5);
  });

  it("teste se retorna erro com sucesso", async function () {
    sinon
      .stub(sales, "findById")
      .resolves({ status: 404, ress: { message: "Sale not found" } });

    const result = await service.sales.getById(999);
    expect(result.ress).to.be.deep.equal({ message: "Sale not found" });
  });
});
