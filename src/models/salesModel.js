// const camelize = require('camelize');
// const snakeize = require('snakeize');
// const connection = require('./connection');
const utils = require('./utils');

// const insert = async (product) => {
//   console.log(product);
//   const columns = Object.keys(snakeize(product))
//     .map((key) => `${key}`)
//     .join(', ');

//   const placeholders = Object.keys(product)
//     .map((_key) => '?')
//     .join(', ');

//   const [{ insertId }] = await connection.execute(
//     `INSERT INTO products (${columns}) VALUE (${placeholders})`,
//     [...Object.values(product)],
//   );

//   return insertId;
// };
const insertSale = async () => {
  // const date = new Date().toLocaleString('en-US');
  console.log(new Date().toLocaleString('en-US'));
  const insertId = await utils.query.insert('sales', { date: null });
  return insertId;
};

const insertSalesProducts = async (sales) => {
  const saleId = await insertSale();
  sales.forEach(async (sale) => {
    await utils.query.insert('sales_products', { ...sale, saleId });
  });

  return saleId;
};

module.exports = {
  insertSalesProducts,
};
