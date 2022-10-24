const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

router.get('/:id', controllers.products.getForId);
router.get('/', controllers.products.getAll);
// router.put('/', async (req, res) => {
//   const {} = req.params;
//   const {} = req.body;
  
//   res.status(200).json(message);
// });
// router.get("/products/:id", (req, res) => {});
module.exports = router;