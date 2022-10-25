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

module.exports = { getForId, insert };
