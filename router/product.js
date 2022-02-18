const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const {createProduct,isAuthenticated} = require('../controller');
router.post('/',isAuthenticated,upload.any(),createProduct);
module.exports = router;
