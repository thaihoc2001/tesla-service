const express = require('express');
const router = express.Router();
const {isAuthenticated,createOrder,getOrder,deleteOrder,updateStatusOrder} = require('../controller');

router.post('/',createOrder);
router.get('/',isAuthenticated,getOrder);
router.put('/status/:order_id', isAuthenticated,updateStatusOrder);
router.delete('/:order_id',isAuthenticated, deleteOrder);

module.exports = router;
