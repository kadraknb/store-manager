// const { expect } = require("chai");
// const sinon = require("sinon");

// const connection = require("../../../src/models/connection");
// const models = require("../../../src/models");

// const { productFromDb } = require("./mocks/products.model.mock");

// describe("Testes de unidade models de produtos", function () {
//   afterEach(() => {
//     sinon.restore();
//   });

//   it("recuperando todos os produtos", async function () {
//     sinon.stub(connection, "execute").resolves([productFromDb]);
//     const result = await models.products.findAll();
//     expect(result).to.be.deep.equal(productFromDb);
//   });

//   it("reucuperando um produto a partir do seu id", async function () {
//     sinon.stub(connection, "execute").resolves([[productFromDb[0]]]);
//     const result = await models.products.findById(1);
//     expect(result).to.be.deep.equal(productFromDb[0]);
//   });

//   it(" teste se inseri um produto", async function () {
//     sinon.stub(connection, "execute").resolves([{ insertId: 42 }]);
//     const name = "seila";
//     const result = await models.products.insert(name);
//     expect(result).to.equal(42);
//   });
// });
