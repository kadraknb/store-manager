const model = require('../../models');

const productIdIsInvalide = async (sales) => {
  const allProducts = await model.products.findAll();
  const seila2 = sales.every(({ productId }) => allProducts.some(({ id }) => id === productId));
  
  if (!seila2) {
    return { status: 404, message: 'Product not found' };
  }

  return false;
};

const quantity = (sales) => {
  const DontHasUnitsInQuantity = sales.every(
    (objSale) => objSale.quantity < 1,
  );
  if (DontHasUnitsInQuantity) {
    return {
      status: 422,
      message: '"quantity" must be greater than or equal to 1',
    };
  }

  return false;
};

module.exports = { quantity, productIdIsInvalide };