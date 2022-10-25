const productId = (req, res, next) => {
  const dontHasProductId = req.body.every(
    (objSale) => !Object.keys(objSale).includes('productId'),
  );
  if (dontHasProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const quantity = (req, res, next) => {
  const dontHasQuantity = req.body.every(
    (objSale) => !Object.keys(objSale).includes('quantity'),
  );
  if (dontHasQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

module.exports = { productId, quantity };