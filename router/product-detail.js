const express = require('express')
const router = express.Router();

const {createProductDetail, isAuthenticated, updateProductDetail} = require('../controller');
router.post('/',isAuthenticated, createProductDetail);
router.put('/', isAuthenticated, updateProductDetail);
module.exports = router;
