const model = require('../models');
const service = require('../services');

const getAll = async (_req, res) => {
  const data = await service.products.getAll();
  return res.status(200).json(data);
};

const getForId = async (req, res) => {
  const { id } = req.params;
  const ress = await service.products.getForId(id);
  if (!ress) return res.status(404).json({ message: 'Product not found' });
  
    return res.status(200).json(ress);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const ress = await service.products.insert(name);
  return res.status(ress.status).json(ress.message);
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
