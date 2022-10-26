const service = require('../services');

const insert = async (req, res) => {
  const ress = await service.sales.insert(req, res);
  return ress;
};

const getAll = async (req, res) => {
  const ress = await service.sales.getAll(req, res);
  return ress;
};

const getById = async (req, res) => {
  const ress = await service.sales.getById(req, res);
  return ress;
};

module.exports = {
  insert,
  getAll,
  getById,
};
