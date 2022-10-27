const express = require('express');
const controllers = require('../controllers');

const router = express.Router();
const {
  insert,
  getAll,
  getForId,
  attProducts,
  deleteById,
  search,
} = controllers.products;

router.delete('/:id', deleteById);
router.put('/:id', attProducts);

router.get('/search', search);
router.get('/:id', getForId);
router.get('/', getAll);

router.post('/', insert);

module.exports = router;