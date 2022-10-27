const model = require('../models');
const service = require('../services');

const getAll = async (_req, res) => {
  const data = await model.products.findAll();
  return res.status(200).json(data);
};

const getForId = async (req, res) => {
  const ress = await service.products.getForId(req, res);
  return ress;
};

const insert = async (req, res) => {
  const ress = await service.products.insert(req, res);
  return ress;
};

const attProducts = async (req, res) => {
  const result = await service.products.updateById(req, res);
  return result;
};

const deleteById = async (req, res) => {
  const result = await service.products.deleteById(req, res);
  return result;
};

const search = async (req, res) => {
  const { q } = req.query;
  const result = await model.products.search(q);

  return res.status(200).json(result);
};

module.exports = {
  getAll,
  getForId,
  insert,
  attProducts,
  deleteById,
  search,
};
