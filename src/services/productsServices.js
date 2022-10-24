const model = require('../models');

const getForId = async (req, res) => {
  const { id } = req.params;
  const data = await model.products.findAll();
  const dataHesId = data.some((obj) => obj.id === Number(id));
  
  if (!dataHesId) return res.status(404).json({ message: 'Product not found' });

  const dataForId = await model.products.findById(id);
  return res.status(200).json(dataForId);
};

module.exports = { getForId };
