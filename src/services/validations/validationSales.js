const model = require('../../models');

const productIdIsInvalide = async (sales) => {
  const allProducts = await model.products.findAll();

  // const seila = !allProducts.find(
  //   ({ id }) => sales
  //     .some((sale) => { console.log(sale, 's'); console.log(id, 's'); return sale.productId === id; }),
  // );
  const seila2 = sales.every(({ productId }) => {
    console.log(allProducts.find(({ id }) => id === productId), 'asdasd');
    return allProducts.some(({ id }) => id === productId);
});
  // console.log(allProducts, 'www');
  // console.log(sales, 'www');
  // console.log(seila);
  // console.log(seila2, 'err');
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