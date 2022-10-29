const salesFromDb = [
  {
    saleId: 1,
    date: new Date(),
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: new Date(),
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: new Date(),
    productId: 3,
    quantity: 15,
  },
];

const salesId = 
{
  status: 200,
  ress: [
    { date: '2022-10-29 18:08:27', productId: 1, quantity: 5 },
    { date: '2022-10-29 18:08:27', productId: 2, quantity: 10 }
  ]
};

module.exports = {
  salesFromDb,
  salesId,
};
