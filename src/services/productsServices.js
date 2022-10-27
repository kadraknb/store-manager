const model = require('../models');
const validation = require('./validations');

const getForId = async (req, res) => {
  const { id } = req.params;
  const data = await model.products.findAll();
  const dataHesId = data.some((obj) => obj.id === Number(id));
  
  if (!dataHesId) return res.status(404).json({ message: 'Product not found' });

  const dataForId = await model.products.findById(id);
  return res.status(200).json(dataForId);
};

const insert = async (req, res) => {
  const { name } = req.body;
  const validationName = validation.products.name(name);
  
  if (validationName.status) {
    return res
      .status(validationName.status)
      .json({ message: validationName.message });
  }

  const id = await model.products.insert({ name });
  return res.status(201).json({ id, name });
};

const updateById = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const validationName = validation.products.name(name);
  if (validationName) {
    return res
      .status(validationName.status)
      .json({ message: validationName.message });
  }

  const validationId = await model.products.findById(id);
  if (!validationId) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await model.products.updateById(id, { name });
  return res.status(200).json({ id, name });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  
  const validationId = await model.products.findById(id);
  if (!validationId) {
    return res.status(404).json({ message: 'Product not found' });
  }

  await model.products.deleteById(id);
  return res.status(204).end();
};

module.exports = { getForId, insert, updateById, deleteById };
