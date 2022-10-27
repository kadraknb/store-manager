const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();
const { productId, quantity } = middlewares.validation;

const {
  insert,
  getAll,
  getById,
  deleteById,
  updateById,
} = controllers.sales;

router.delete('/:id', deleteById);

router.get('/:id', getById);
router.get('/', getAll);

router.use(productId, quantity);
router.put('/:id', updateById);
router.post('/', insert);
// router.post("/", controllers.products.insert);
module.exports = router;
