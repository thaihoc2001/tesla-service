const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');
const {isAuthenticated, deleteImage, updateImage, addImage} = require('../controller');
router.delete('/:image_id',isAuthenticated,deleteImage);
router.put('/:image_id',isAuthenticated, upload.single('image'),updateImage);
router.post('/', isAuthenticated, upload.single('image'), addImage);
module.exports = router;
