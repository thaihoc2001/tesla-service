const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const {createProduct,isAuthenticated,getProductById,getProducts,getProductByType,getProductByCategory,deleteProducts,updateProduct,getSeeMoreProduct} = require('../controller');

router.post('/',isAuthenticated,upload.any(),createProduct);
router.get('/:limit/:offset',getProducts);
router.get('/:product_id',getProductById);
router.get('/category/:category_id/:count',getProductByCategory);
router.get('/product_type/:product_type_id/:count',getProductByType);
router.delete('/:product_id',isAuthenticated,deleteProducts);
router.put('/:product_id', isAuthenticated, updateProduct);
router.get('/see/more/:count',getSeeMoreProduct);
module.exports = router;
