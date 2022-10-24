const model = require('../models');
const service = require('../services');

const getAll = async (_req, res) => {
  const data = await model.products.findAll();
  return res.status(200).json(data);
};

const getForId = async (req, res) => {
  // console.log(2);
  const ress = await service.products.getForId(req, res);
  // console.log(ress);
  return ress;
};

module.exports = {
  getAll,
  getForId,
};
