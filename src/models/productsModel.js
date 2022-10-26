const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');

const insert = async (product) => {
  console.log(product);
  const columns = Object.keys(snakeize(product))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO products (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [productId],
  );
  return camelize(result);
};

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM products');
  return camelize(result);
};

// const findByTravelStatusId = async (travelStatusId) => {
//   const [result] = await connection.execute(
//     'SELECT * FROM travels WHERE travel_status_id = ?',
//     [travelStatusId],
//   );
//   return camelize(result);
// };

const updateById = async (travelId, dataToUpdate) => {
  const formattedColumns = Object.keys(snakeize(dataToUpdate))
    .map((key) => `${key} = ?`)
    .join(', ');

  return connection.execute(
    `UPDATE products SET ${formattedColumns} WHERE id = ?`,
    [...Object.values(dataToUpdate), travelId],
  );
};

module.exports = {
  insert,
  findById,
  findAll,
  // findByTravelStatusId,
  updateById,
};
