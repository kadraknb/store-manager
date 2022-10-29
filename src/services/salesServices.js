const model = require('../models');
const validation = require('./validations');

const { quantity, productIdIsInvalide } = validation.sales;
const {
    insertSalesProducts,
    findById,
    getSaleId,
    findAll,
    deleteById,
    
  } = model.sales;

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
  const id = await insertSalesProducts(body);
  const ress = { id, itemsSold: [...body] };

  return res.status(201).json(ress);
};

const getAll = async () => {
  const ress = await findAll();
  return ress;
};

const getById = async (id) => {
  const saleId = await getSaleId(Number(id));
  if (!saleId) {
    return { status: 404, ress: { message: 'Sale not found' } };
  }

  const result = await findById(id);
  return { status: 200, ress: result };
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const result = await getSaleId(id);
  if (!result) return res.status(404).json({ message: 'Sale not found' });

  await deleteById(id);
  res.status(204).end();
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const result = await getSaleId(id);
  if (!result) return res.status(404).json({ message: 'Sale not found' });

  const isNotValidQuantity = quantity(req.body);
  if (isNotValidQuantity) {
 return res
    .status(422)
    .json({ message: '"quantity" must be greater than or equal to 1' }); 
  }

  const isNotValidProductId = await productIdIsInvalide(req.body);
  if (isNotValidProductId) {
    const { status, message } = isNotValidProductId;
    return res.status(status).json({ message });
  }

  await model.sales.updateById(id, req.body);
  const ress = { saleId: id, itemsUpdated: [...req.body] };
  return res.status(200).json(ress);
};

module.exports = { insert, getAll, getById, deleteSale, updateById };
