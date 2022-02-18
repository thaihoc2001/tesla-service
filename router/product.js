const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const {createProduct,isAuthenticated,getProductById,getProducts} = require('../controller');

router.post('/',isAuthenticated,upload.any(),createProduct);
router.get('/',getProducts);
router.get('/:product_id',getProductById);
module.exports = router;
