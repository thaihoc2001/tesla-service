const express = require('express');
const router = express.Router();

const {getCategory, createCategory, updateCategory, deleteCategory,isAuthenticated} = require('../controller');

router.get('/',getCategory);
router.post('/',isAuthenticated, createCategory);
router.put('/:category_id',isAuthenticated,updateCategory);
router.delete('/:category_id',isAuthenticated,deleteCategory);

module.exports = router;
