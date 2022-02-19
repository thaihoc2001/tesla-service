const express = require('express');
const router = express.Router();

const {isAuthenticated,loginUser,changePassword,refreshTokenUser} = require('../controller');

router.post('/login',loginUser);
router.post('/refreshToken',refreshTokenUser);
router.put('/changePassword', isAuthenticated, changePassword);

module.exports = router;
