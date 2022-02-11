const express = require('express');
const router = express.Router();
const productCategoryController = require('../controller/product-category.controller')

router.post('/',productCategoryController.createProductCategory);
router.get('/',productCategoryController.getProductCategory);

module.exports = router
