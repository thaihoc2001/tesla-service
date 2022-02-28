const express = require('express');
const router = express.Router();

const {isAuthenticated, deleteImage} = require('../controller');
router.delete('/:image_id',isAuthenticated,deleteImage);

module.exports = router;
