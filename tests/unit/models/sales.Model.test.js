const { expect } = require("chai");
const sinon = require("sinon");

const connection = require("../../../src/models/connection");
const { findAll, findById } = require("../../../src/models/salesModel");
const { salesFromDb, salesId } = require("./mocks/sales.mock");

describe("teste na camada sales Model", function () {
  afterEach(() => {
    sinon.restore();
  });

  it("teste se retorna a requisiçao corretamente", async function () {
    sinon.stub(connection, "execute").resolves([salesFromDb]);
    const result = await findAll();

    expect(result).to.be.deep.equal(salesFromDb);
  });

  it("teste se retorna a requisiçao corretamente", async function () {
    sinon.stub(connection, "execute").resolves([salesId]);

    const result = await findById(1);

    expect(result).to.be.deep.equal(salesId);
  });
});
