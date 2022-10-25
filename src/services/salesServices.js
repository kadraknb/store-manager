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
    // console.log(body);
    const { status, message } = isNotValidProductId;
    return res.status(status).json({ message });
  }
  console.log('========================================================');
  const id = await model.sales.insertSalesProducts(body);
  const ress = { id, itemsSold: [...body] };

  return res.status(201).json(ress);
};

module.exports = { insert };

// {
//   "id": 3,
//   "itemsSold": [
//     {
//       "productId": 1,
//       "quantity": 1
//     },
//     {
//       "productId": 2,
//       "quantity": 5
//     }
//   ]
// }