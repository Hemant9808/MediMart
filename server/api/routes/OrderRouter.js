
const express = require('express');
const { createOrder, getAllOrders, getMyOrders } = require('../controllers/OrderController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router()

router.post('/createOrder',protect,createOrder);
router.post('/getAllOrders',getAllOrders);
router.get('/getMyOrders',protect,getMyOrders);
 router.get('/getAllOrders',getAllOrders);

module.exports =router;