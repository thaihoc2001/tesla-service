const express = require('express');
const router = express.Router();

const {createProductType,getProductType,updateProductType,deleteProductType,isAuthenticated} = require('../controller');

router.get('/',getProductType);
router.post('/',isAuthenticated, createProductType);
router.put('/:productType_id',isAuthenticated,updateProductType);
router.delete('/:productType_id',isAuthenticated,deleteProductType);

module.exports = router;
