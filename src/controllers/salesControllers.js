const service = require('../services');

const insert = async (req, res) => {
  const ress = await service.sales.insert(req, res);
  return ress;
};

const getAll = async (req, res) => {
  const ress = await service.sales.getAll();
  return res.status(200).json(ress);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const ress = await service.sales.getById(id);
  return res.status(ress.status).json(ress.ress);
};

const deleteById = async (req, res) => {
  const ress = await service.sales.deleteSale(req, res);
  return ress;
};

const updateById = async (req, res) => {
  const ress = await service.sales.updateById(req, res);
  return ress;
};

module.exports = {
  insert,
  getAll,
  getById,
  deleteById,
  updateById,
};
