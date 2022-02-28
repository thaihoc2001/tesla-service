const express = require('express');
const router = express.Router();
const {getUser, createUser,isAuthenticated, getCustomer} = require('../controller');
router.get('/me',isAuthenticated,getUser);
router.post('/', createUser);
router.get('/customer',isAuthenticated,getCustomer);
module.exports = router;
