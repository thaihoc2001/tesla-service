const express = require('express');
const router = express.Router();

const {createProductType,getProductType,updateProductType,deleteProductType,isAuthenticated,getCategoriesOfProductType} = require('../controller');

router.get('/',getProductType);
router.post('/',isAuthenticated, createProductType);
router.put('/:productType_id',isAuthenticated,updateProductType);
router.delete('/:productType_id',isAuthenticated,deleteProductType);
router.get('/categories',getCategoriesOfProductType);

module.exports = router;
