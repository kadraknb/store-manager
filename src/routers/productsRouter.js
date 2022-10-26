const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.put('/:id', controllers.products.attProducts);
router.get('/:id', controllers.products.getForId);
router.get('/', controllers.products.getAll);
router.post('/', controllers.products.insert);

module.exports = router;