const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const productController = require('../controller/products.controller')


router.post('/', upload.any() , productController.postProduct)
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

module.exports = router
