const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const {createProduct,isAuthenticated,getProductById,getProducts,getProductByType,getProductByCategory,deleteProducts,updateProduct,getAllProduct,getProductsByStatus,getProductByCategoryAndType} = require('../controller');

router.post('/',isAuthenticated,upload.any(),createProduct);
router.get('/all/:count', getProducts);
router.get('/detail/:product_id',getProductById);
router.get('/category/:category_id/:count',getProductByCategory);
router.get('/product_type/:product_type_id/:count',getProductByType);
router.delete('/:product_id',isAuthenticated,deleteProducts);
router.put('/:product_id', isAuthenticated, updateProduct);
router.get('/type/category/:count',getProductByCategoryAndType);
router.get('/',getAllProduct);
router.get('/status/:status/:count',getProductsByStatus);
module.exports = router;
