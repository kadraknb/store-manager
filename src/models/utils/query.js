// const camelize = require('camelize');
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

module.exports = {
  insert,
};
