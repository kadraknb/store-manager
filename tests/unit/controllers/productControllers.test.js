const { expect } = require("chai");
const sinon = require("sinon");

const controllers = require("../../../src/controllers/productsControllers");
const services = require("../../../src/services/productsServices");

const mock = [
  {
    id: 1,
    name: "Martelo de Thor",
  },
  {
    id: 2,
    name: "Traje de encolhimento",
  },
  {
    id: 3,
    name: "Escudo do Capitão América",
  },
];

describe("Testa a camada Controllers de Products", function () {
  afterEach(sinon.restore);
  describe("Testa a função getAll", function () {
    it("retorna todos os products", async function () {
      const req = {};
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services, "getAll").resolves(mock);
      await controllers.getAll(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });
  });

    it("test fun getForId", async function () {
      const req = { params: { id: 1 } };
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon.stub(services, "getForId").resolves(mock[0]);
      await controllers.getForId(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
      expect(res.json.calledWith(mock[0])).to.be.equal(true);
    });

});
