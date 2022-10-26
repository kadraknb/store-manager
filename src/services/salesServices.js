const model = require('../models');
const validation = require('./validations');

const { quantity, productIdIsInvalide } = validation.sales;

const insert = async ({ body }, res) => {
  const isNotValidQuantity = quantity(body);
  if (isNotValidQuantity) {
    const { status, message } = isNotValidQuantity;
    return res.status(status).json({ message });
  }

  const isNotValidProductId = await productIdIsInvalide(body);
  if (isNotValidProductId) {
    const { status, message } = isNotValidProductId;
    return res.status(status).json({ message });
  }
  const id = await model.sales.insertSalesProducts(body);
  const ress = { id, itemsSold: [...body] };

  return res.status(201).json(ress);
};

const getAll = async (req, res) => {
  const ress = await model.sales.findAll();
  return res.status(200).json(ress);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { getSaleId, findById } = model.sales;

  const saleId = await getSaleId(Number(id));
  if (!saleId) return res.status(404).json({ message: 'Sale not found' });

  const result = await findById(id);
  return res.status(200).json(result);
};

module.exports = { insert, getAll, getById };
