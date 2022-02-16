const express = require('express');
const router = express.Router();
const {getUser, createUser} = require('../controller');
router.get('/', getUser);
router.post('/', createUser);
module.exports = router;
