const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')
const productController = require('../controller/products.controller')


router.post('/', upload.array("images"), productController.postProduct)
router.get('/', productController.getProducts);

module.exports = router
