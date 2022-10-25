const service = require('../services');

const insert = async (req, res) => {
  const ress = await service.sales.insert(req, res);
  return ress;
};

module.exports = {
  insert,
};
