const express = require('express');
const router = express.Router();
const productTypeController = require('../controller/product-type.controller')

router.post('/',productTypeController.createProductType);
router.get('/',productTypeController.getProductType);

module.exports = router
