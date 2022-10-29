const { expect } = require("chai");
const sinon = require("sinon");

const services = require("../../../src/services");
const controllers = require("../../../src/controllers");

const mock = [
  [
    {
      saleId: 1,
      date: "2022-10-17T17:57:09.000Z",
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date: "2022-10-17T17:57:09.000Z",
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date: "2022-10-17T17:57:09.000Z",
      productId: 3,
      quantity: 15,
    },
  ],
];

describe("Testa a camada Controllers de Sales", function () {
  afterEach(sinon.restore);
  describe("Testa a função getAll", function () {
    it("retorna todos as sales", async function () {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services.sales, "getAll").resolves(mock);
      await controllers.sales.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });
  });
});
