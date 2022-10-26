const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('../connection');

const insert = async (tables, product) => {
  const columns = Object.keys(snakeize(product))
    .map((key) => `${key}`)
    .join(', ');

  const placeholders = Object.keys(product)
    .map((_key) => '?')
    .join(', ');

  const [{ insertId }] = await connection.execute(
    `INSERT INTO ${tables} (${columns}) VALUE (${placeholders})`,
    [...Object.values(product)],
  );

  return insertId;
};

const findById = async (tables, productId) => {
  const [[result]] = await connection.execute(
    `SELECT * FROM ${tables} WHERE id = ?`,
    [productId],
  );
  return camelize(result);
};

const findAll = async (tables) => {
  const [result] = await connection.execute(`SELECT * FROM ${tables}`);
  return camelize(result);
};

module.exports = {
  insert,
  findAll,
  findById,
};
