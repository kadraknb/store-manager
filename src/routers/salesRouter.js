const express = require('express');
const controllers = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();
const { productId, quantity } = middlewares.validation;

router.use(productId, quantity);
router.post('/', controllers.sales.insert);
// router.post("/", controllers.products.insert);
module.exports = router;
