const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const {createProduct,isAuthenticated,getProductById,getProducts,getProductByType,getProductByCategory,deleteProducts} = require('../controller');

router.post('/',isAuthenticated,upload.any(),createProduct);
router.get('/',getProducts);
router.get('/:product_id',getProductById);
router.get('/category/:category_id',getProductByCategory);
router.get('/product_type/:product_type_id',getProductByType);
router.delete('/',isAuthenticated,deleteProducts);
module.exports = router;
