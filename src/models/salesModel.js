const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');
const utils = require('./utils');

const insertSale = async () => {
  const insertId = await utils.query.insert('sales', { date: new Date() });
  return insertId;
};

const insertSalesProducts = async (sales) => {
  const saleId = await insertSale();
  sales.forEach(async (sale) => {
    await utils.query.insert('sales_products', { ...sale, saleId });
  });

  return saleId;
};

const findById = async (productId) => {
  const [result] = await connection.execute(
    `SELECT S.date as date, SP.product_id as productId, SP.quantity as quantity
      FROM StoreManager.sales as S
      inner join StoreManager.sales_products as SP
      on S.id = SP.sale_id
      where S.id = ?
      group by productId, quantity, S.date
      order by productId;`,
    [productId],
  );
  return camelize(result);
};

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT S.id as saleId, S.date as date, SP.product_id as productId, SP.quantity as quantity
      FROM StoreManager.sales as S
      inner join StoreManager.sales_products as SP
      on S.id = SP.sale_id
      group by saleId, productId, quantity
      order by saleId, productId;`,
);
  return camelize(result);
};

const getSaleId = async (saleId) => {
  const ress = await utils.query.findById('sales', saleId);
  return camelize(ress);
};

const deleteById = async (productId) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [productId]);
};

const updateById = async (travelId, dataToUpdateArr) => {
  // const formattedColumns = Object.keys(snakeize(dataToUpdate[0]))
  //   .map((key) => `${key} = ?`)
  //   .join(', ');

  // console.log(formattedColumns);
  // console.log(dataToUpdate);
  // console.log(travelId);
  // return connection.execute(
  //   `UPDATE sales_products SET ${formattedColumns} WHERE sale_id = ?`,
  //   [...Object.values(dataToUpdate[0]), travelId],
  // );
  
  //   const [[result]] = await connection.execute(
  //     'SELECT product_id, quantity FROM sales_products WHERE id = ?',
  //     [travelId],
  //   );
  //   // return camelize(result);
  // console.log(result);

  const formattedColumns = dataToUpdateArr.map((dataToUpdate) => Object.keys(snakeize(dataToUpdate))
    .map((key) => `${key} = ?`)
      .join(', '));
  
  formattedColumns.forEach(async (formattedColumn, index) =>
    // console.log(Object.values(dataToUpdateArr[index]), 'asddasdasd');
    connection.execute(
      `UPDATE sales_products SET ${formattedColumn} WHERE sale_id = ? and product_id = ?`,
      [
        ...Object.values(dataToUpdateArr[index]),
        travelId,
        dataToUpdateArr[index].productId,
      ],
    ));
};

module.exports = {
  insertSalesProducts,
  findAll,
  findById,
  getSaleId,
  deleteById,
  updateById,
};
